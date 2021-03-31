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
        registry: core.getInput(Inputs.REGISTRY),
        username: core.getInput(Inputs.USERNAME),
        password: core.getInput(Inputs.PASSWORD),
        logout: core.getInput(Inputs.LOGOUT) || "true",
    };
}
