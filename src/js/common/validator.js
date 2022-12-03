import { CustomError, ERROR_MESSAGE, OutOfRangeError } from "./error.js";
import { NAMES } from "./const.js";

export class Validator {
    constructor() {}

    validateCarNames = (names) => {
        try {
            names.forEach(name => {
                if (name.length < NAMES.MIN_RANGE || name.length > NAMES.MAX_RANGE) {
                    throw new OutOfRangeError(ERROR_MESSAGE.CAR_NAME_OUT_OF_RANGE);
                }
            })
            return true;
        } catch (e) {
            this.#catchErrors(e);
        }
    }

    #catchErrors(e) {
        if (e instanceof CustomError) {
            alert(e.message);
        } else {
            throw e;
        }
    }
}