/***************************************************************************************************
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE file in the project root for license information.
 **************************************************************************************************/

import * as core from "@actions/core";
import * as io from "@actions/io";
import * as os from "os";
import { getInputs } from "./context";
import { execute } from "./utils";

let podmanPath: string | undefined;

async function getPodmanPath(): Promise<string> {
    if (podmanPath == null) {
        podmanPath = await io.which("podman", true);
        await execute(podmanPath, [ "version" ]);
    }

    return podmanPath;
}

async function run(): Promise<void> {
    if (os.platform() !== "linux") {
        throw new Error("Only supported on linux platform");
    }

    const { registry, username, password } = getInputs();

    const args = [
        "login",
        registry,
        "-u",
        username,
        "-p",
        password,
    ];
    try {
        await execute(await getPodmanPath(), args);
        core.info(`✅ Successfully logged in to ${registry}`);
    }
    catch (err) {
        core.error(`Failed to login to ${registry}`);
    }
}

run().catch(core.setFailed);
