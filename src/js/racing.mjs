import {MSG_ERROR_INVALID_NUMBER, MSG_ERROR_NO_NAMES} from "../constants.mjs";
import {isEmpty, validationTryCount} from "./validation.mjs";

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

export const [COMMAND_GO, COMMAND_STOP] = ["go", "stop"];
export const getCommand = (number) => (number >= 4 ? COMMAND_GO : COMMAND_STOP);

export function getCarsNames(str) {
    if (isEmpty(str)) {
        return str.split(',');
    }
    throw new Error(MSG_ERROR_NO_NAMES);
}

export function getTryCount(str) {
    if (validationTryCount(str)) {
        return parseInt(str, 10);
    }
    throw new Error(MSG_ERROR_INVALID_NUMBER);
}
