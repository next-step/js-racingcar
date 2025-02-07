class Car {
    static MAX_NAME_LENGTH = 5;
    static MIN_NAME_LENGTH = 1;
    position = 0;
    static ERROR_MESSAGES = {
        INVALID_NAME: `자동차 이름은 ${Car.MIN_NAME_LENGTH}자 이상 ${Car.MAX_NAME_LENGTH}자 이하만 가능합니다.`,
    };

    constructor(name) {
        if (!Car.isValidName(name)) {
            throw new Error(Car.ERROR_MESSAGES.INVALID_NAME);
        }
        this.name = name;
    }

    moveForward() {
        this.position += 1;
    }

    static isValidName(name) {
        return name.length > this.MIN_NAME_LENGTH && name.length <= this.MAX_NAME_LENGTH;
    }
}

export default Car;
