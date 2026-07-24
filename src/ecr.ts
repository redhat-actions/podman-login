import * as core from "@actions/core";
import { ECR } from "@aws-sdk/client-ecr";

const ecrRegistryRegex = /^(([0-9]{12})\.dkr\.ecr\.(.+)\.amazonaws\.com(.cn)?)(\/([^:]+)(:.+)?)?$/;

export interface ECRData {
    username: string;
    password: string;
  }

export function isECR(registry: string): boolean {
    return ecrRegistryRegex.test(registry);
}

function getRegion(registry: string): string {
    const matches = registry.match(ecrRegistryRegex);
    if (!matches) {
        return "";
    }
    return matches[3];
}

function getAccountID(registry: string): string {
    const matches = registry.match(ecrRegistryRegex);
    if (!matches) {
        return "";
    }
    return matches[2];
}

export async function getECRToken(registry: string, username: string, password: string): Promise<ECRData> {
    // Support AWS OIDC temporary credentials by including the session token
    // when available (set by aws-actions/configure-aws-credentials)
    const sessionToken = process.env.AWS_SESSION_TOKEN;
    const credentials: { accessKeyId: string; secretAccessKey: string; sessionToken?: string } = {
        accessKeyId: username,
        secretAccessKey: password,
    };
    if (sessionToken) {
        credentials.sessionToken = sessionToken;
        core.info("Using AWS session token from environment for ECR authentication");
    }

    const ecr = new ECR({
        credentials,
        region: getRegion(registry),
    });

    const response = await ecr.getAuthorizationToken({ registryIds: [ getAccountID(registry) ] });
    if (!Array.isArray(response.authorizationData) || response.authorizationData.length === 0) {
        throw new Error("Unable to fetch ECR credentials from AWS!");
    }
    const tokenString = Buffer.from(response.authorizationData[0].authorizationToken || "", "base64").toString("utf-8");
    const ecrCredentials = tokenString.split(":", 2);

    // Hide auth token in actions logs
    core.setSecret(ecrCredentials[1]);

    return {
        username: ecrCredentials[0],
        password: ecrCredentials[1],
    };
}
