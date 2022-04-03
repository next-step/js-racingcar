import {MSG_ERROR_INVALID_NUMBER, MSG_ERROR_NO_NAMES} from "./constants.js";

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

export const [COMMAND_GO, COMMAND_STOP] = ["go", "stop"];
export const getCommand = (number) => (number >= 4 ? COMMAND_GO : COMMAND_STOP);

export function getCarsNames(str) {
    const carsNames = str.split(",");
    if (
        carsNames.length === 0 ||
        carsNames.some((name) => name.trim() === "")
    ) {
        throw new Error(MSG_ERROR_NO_NAMES);
    }
    return carsNames;
}

export function getTryCount(str) {
    const count = parseInt(str);
    if (!count) {
        throw new Error(MSG_ERROR_INVALID_NUMBER);
    }
    return count;
}
