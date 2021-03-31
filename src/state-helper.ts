import * as core from "@actions/core";

export const IsPost = !!process.env.STATE_isPost;
export const registry = process.env.STATE_registry || "";
export const logout = /true/i.test(process.env.STATE_logout || "");

export function setRegistry(inputRegistry: string): void {
    core.saveState("registry", inputRegistry);
}

export function setLogout(registryLogout: string): void {
    core.saveState("logout", registryLogout);
}

if (!IsPost) {
    core.saveState("isPost", "true");
}
