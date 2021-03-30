import * as core from "@actions/core";
import { Inputs } from "./generated/inputs-outputs";

export interface ActionInputs {
    registry: string;
    username: string;
    password: string;
}

export function getInputs(): ActionInputs {
    return {
        registry: core.getInput(Inputs.REGISTRY),
        username: core.getInput(Inputs.USERNAME),
        password: core.getInput(Inputs.PASSWORD),
    };
}
