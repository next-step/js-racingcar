import { CustomError, ERROR_MESSAGE, InputMinInsufficientError, InputOutOfRangeError } from "./error.js";
import { MIN_ROUND, NAME, VALIDATIONTYPE } from "./const.js";

export class Validator {
    constructor() {
    }

    #catchErrors(e) {
        if (e instanceof CustomError) {
            alert(e.message);
        } else {
            throw e;
        }
    }

    #setNameErrors = (names) => {
        names.forEach(name => {
            if (name.length < NAME.MIN_RANGE || name.length > NAME.MAX_RANGE) {
                throw new InputOutOfRangeError(ERROR_MESSAGE.InputOutOfRange);
            }
        })
        return true;
    }

    #setRoundErrors = (turn) => {
        if (!turn || turn < MIN_ROUND) throw new InputMinInsufficientError(ERROR_MESSAGE.InputMinInsufficient);
        return true;
    }

    validate(type, value) {
        try {
            if (type === VALIDATIONTYPE.NAME) return this.#setNameErrors(value);
            if (type === VALIDATIONTYPE.ROUND) return this.#setRoundErrors(value);
        } catch (e) {
            this.#catchErrors(e);
        }
    }
}