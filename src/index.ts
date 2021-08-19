/***************************************************************************************************
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE file in the project root for license information.
 **************************************************************************************************/

import * as core from "@actions/core";
import * as io from "@actions/io";
import * as os from "os";
import * as path from "path";
import { getInputs } from "./context";
import { execute } from "./utils";
import * as stateHelper from "./state-helper";

let podmanPath: string | undefined;

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

    const {
        registry, username, password, logout,
    } = getInputs();

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

    await execute(await getPodmanPath(), args);
    core.info(`✅ Successfully logged in to ${registry} as ${username}`);

    // Setting REGISTRY_AUTH_FILE environment variable as buildah needs
    // this environment variable to point to registry auth file
    const podmanAuthFilePath = path.join("/", "tmp", `podman-run-${process.getuid()}`,
        "containers", "auth.json");
    core.debug(`Setting up the environment variable REGISTRY_AUTH_FILE to ${podmanAuthFilePath}`);
    core.exportVariable("REGISTRY_AUTH_FILE", podmanAuthFilePath);
}

async function registryLogout(): Promise<void> {
    if (!stateHelper.logout) {
        return;
    }
    await execute(await getPodmanPath(), [ "logout", stateHelper.registry ]);
}

if (!stateHelper.IsPost) {
    run().catch(core.setFailed);
}
else {
    registryLogout().catch(core.setFailed);
}
