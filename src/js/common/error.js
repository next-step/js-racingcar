export const ERROR_MESSAGE = {
    CAR_NAME_OUT_OF_RANGE: '자동차의 이름은 1자이상, 5자 이하만 가능합니다'
}

export class CustomError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        this.message = message;
    }
}

export class OutOfRangeError extends CustomError {
    constructor(message) {
        super(message, 'OutOfRangeError');
    }
}