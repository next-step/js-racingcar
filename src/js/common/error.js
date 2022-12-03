import { MIN_ROUND, NAME } from "./const.js";

export const ERROR_MESSAGE = {
    InputOutOfRange: `자동차의 이름은 ${NAME.MIN_RANGE}자 이상, ${NAME.MAX_RANGE}자 이하만 가능합니다`,
    InputMinInsufficient: `레이싱 횟수는 ${MIN_ROUND}이상이어야 합니다.`
}

export class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        this.message = message;
    }
}

export class InputOutOfRangeError extends CustomError {
    constructor(message) {
        super(message, 'InputOutOfRangeError');
    }
}

export class InputMinInsufficientError extends CustomError {
    constructor(message) {
        super(message, 'InputMinInsufficientError');
    }
}