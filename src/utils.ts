/***************************************************************************************************
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE file in the project root for license information.
 **************************************************************************************************/

import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as path from "path";
import { promises as fs } from "fs";
import * as os from "os";

interface ExecResult {
    exitCode: number;
    stdout: string;
    stderr: string;
}

export async function execute(
    executable: string,
    args: string[],
    execOptions: exec.ExecOptions & { group?: boolean } = {},
): Promise<ExecResult> {
    let stdout = "";
    let stderr = "";

    const finalExecOptions = { ...execOptions };
    finalExecOptions.ignoreReturnCode = true; // the return code is processed below

    finalExecOptions.listeners = {
        stdline: (line): void => {
            stdout += `${line}\n`;
        },
        errline: (line): void => {
            stderr += `${line}\n`;
        },
    };

    if (execOptions.group) {
        const groupName = [ executable, ...args ].join(" ");
        core.startGroup(groupName);
    }

    try {
        const exitCode = await exec.exec(executable, args, finalExecOptions);

        if (execOptions.ignoreReturnCode !== true && exitCode !== 0) {
            // Throwing the stderr as part of the Error makes the stderr show up in the action outline,
            // which saves some clicking when debugging.
            let error = `${path.basename(executable)} exited with code ${exitCode}`;
            if (stderr) {
                error += `\n${stderr}`;
            }
            throw new Error(error);
        }

        return {
            exitCode,
            stdout,
            stderr,
        };
    }

    finally {
        if (execOptions.group) {
            core.endGroup();
        }
    }
}

export async function getDockerConfigJson(): Promise<string> {
    const dockerConfigPath = path.join(os.homedir(), ".docker", "config.json");
    return fs.readFile(dockerConfigPath, "utf-8")
        .catch((err) => { if (err.code === 'ENOENT') { return '{"auths":{}}'; } throw err; });
}
