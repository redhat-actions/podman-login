/***************************************************************************************************
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE file in the project root for license information.
 **************************************************************************************************/

import * as core from "@actions/core";
import { promises as fs } from "fs";
import * as io from "@actions/io";
import * as os from "os";
import * as path from "path";
import * as ecr from "./ecr";
import { execute, getDockerConfigJson } from "./utils";
import * as stateHelper from "./state-helper";
import { Inputs } from "./generated/inputs-outputs";

let podmanPath: string | undefined;
let registry: string;
const dockerConfigPath = path.join(os.homedir(), ".docker", "config.json");

async function getPodmanPath(): Promise<string> {
    if (podmanPath == null) {
        podmanPath = await io.which("podman", true);
        await execute(podmanPath, [ "version" ], { group: true });
    }

    return podmanPath;
}

async function run(): Promise<void> {
    if (os.platform() !== "linux") {
        throw new Error("❌ Only supported on linux platform");
    }

    registry = core.getInput(Inputs.REGISTRY, { required: true });
    let username = core.getInput(Inputs.USERNAME, { required: true });
    let password = core.getInput(Inputs.PASSWORD, { required: true });
    const logout = core.getInput(Inputs.LOGOUT) || "true";
    const authFilePath = core.getInput(Inputs.AUTH_FILE_PATH);

    if (ecr.isECR(registry)) {
        core.info(`💡 Detected ${registry} as an ECR repository`);
        const ECRData = await ecr.getECRToken(registry, username, password);
        username = ECRData.username;
        password = ECRData.password;
    }

    stateHelper.setRegistry(registry);
    stateHelper.setLogout(logout);

    const args = [
        "login",
        registry,
        "-u",
        username,
        "-p",
        password,
    ];

    args.push("--verbose");
    if (authFilePath) {
        args.push(`--authfile=${authFilePath}`);
    }
    await execute(await getPodmanPath(), args);
    core.info(`✅ Successfully logged in to ${registry} as ${username}`);

    // Setting REGISTRY_AUTH_FILE environment variable as buildah needs
    // this environment variable to point to registry auth file

    let podmanAuthFilePath;
    if (authFilePath) {
        podmanAuthFilePath = authFilePath;
    }
    else {
        let authFileDir = path.join("/", "tmp", `podman-run-${process.getuid()}`);
        if (process.env.XDG_RUNTIME_DIR) {
            authFileDir = process.env.XDG_RUNTIME_DIR;
        }
        podmanAuthFilePath = path.join(authFileDir,
            "containers", "auth.json");
    }
    const REGISTRY_AUTH_ENVVAR = "REGISTRY_AUTH_FILE";
    core.info(`Exporting ${REGISTRY_AUTH_ENVVAR}=${podmanAuthFilePath}`);
    core.exportVariable(REGISTRY_AUTH_ENVVAR, podmanAuthFilePath);

    const podmanConfigJson = await fs.readFile(podmanAuthFilePath, "utf-8");
    const podmanConfig = JSON.parse(podmanConfigJson);
    const generatedAuth = podmanConfig.auths[registry];

    core.info(`✍️ Writing registry credentials to "${dockerConfigPath}"`);
    const dockerConfig = JSON.parse(await getDockerConfigJson());

    dockerConfig.auths[registry] = generatedAuth;

    await fs.writeFile(dockerConfigPath, JSON.stringify(dockerConfig, undefined, 8), "utf-8");
}

async function registryLogout(): Promise<void> {
    if (!stateHelper.logout) {
        return;
    }
    await execute(await getPodmanPath(), [ "logout", stateHelper.registry ]);

    const dockerConfig = JSON.parse(await getDockerConfigJson());
    core.info(`Removing registry credentials from "${dockerConfigPath}"`);
    delete dockerConfig.auths[registry];
    await fs.writeFile(dockerConfigPath, JSON.stringify(dockerConfig, undefined, 8), "utf-8");
}

if (!stateHelper.IsPost) {
    run().catch(core.setFailed);
}
else {
    registryLogout().catch(core.setFailed);
}
