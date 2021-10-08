import * as core from "@actions/core";
import { Inputs } from "./generated/inputs-outputs";

export interface ActionInputs {
    registry: string;
    username: string;
    password: string;
    logout: string;
}

export function getInputs(): ActionInputs {
    return {
        registry: core.getInput(Inputs.REGISTRY, { required: true }),
        username: core.getInput(Inputs.USERNAME, { required: true }),
        password: core.getInput(Inputs.PASSWORD, { required: true }),
        logout: core.getInput(Inputs.LOGOUT) || "true",
    };
}
