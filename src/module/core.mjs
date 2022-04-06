import {MSG_ERROR_INVALID_NUMBER, MSG_ERROR_NO_NAMES} from "./constants.mjs";

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

export const [COMMAND_GO, COMMAND_STOP] = ["go", "stop"];
export const getCommand = (number) => (number >= 4 ? COMMAND_GO : COMMAND_STOP);

export function validationCarNames(str) {
    const carsNames = str.split(",");

    return !(carsNames.length === 0 || carsNames.some((name) => name.trim() === ""));
}

export function getCarsNames(str) {
    if (validationCarNames(str)) {
        return str.split(',');
    }
    throw new Error(MSG_ERROR_NO_NAMES);
}

export function validationTryCount(str) {
    const count = parseInt(str, 10);

    if (!count || isNaN(count)) {
        return false;
    }
    return true;
}

export function getTryCount(str) {
    if (validationTryCount(str)) {
        return parseInt(str);
    }
    throw new Error(MSG_ERROR_INVALID_NUMBER);
}
