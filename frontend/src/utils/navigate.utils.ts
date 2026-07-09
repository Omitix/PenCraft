import type { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;


export const setNavigate = (navigateInstance: NavigateFunction) => {

    navigate = navigateInstance;

}

export const getNavigate = (): NavigateFunction => {
    if (!navigate) {
        throw new Error("Navigate must be set at first");
    }
    return navigate
}