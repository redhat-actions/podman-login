import * as core from "@actions/core";

/* eslint-disable dot-notation */
export const IsPost = !!process.env["STATE_isPost"];
export const registry = process.env["STATE_registry"] || "";
export const logout = /true/i.test(process.env["STATE_logout"] || "");
/* eslint-enable dot-notation */

// eslint-disable-next-line @typescript-eslint/no-shadow
export function setRegistry(registry: string): void {
    core.saveState("registry", registry);
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function setLogout(logout: string): void {
    core.saveState("logout", logout);
}

if (!IsPost) {
    core.saveState("isPost", "true");
}
