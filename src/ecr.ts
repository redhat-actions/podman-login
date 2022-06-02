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
    const ecr = new ECR({
        credentials: {
            accessKeyId: username,
            secretAccessKey: password,
        },
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
