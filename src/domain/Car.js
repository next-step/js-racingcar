class Car {
    static MAX_NAME_LENGTH = 5;
    static MIN_NAME_LENGTH = 1;
    static ERROR_MESSAGES = {
        INVALID_NAME: `자동차 이름은 ${Car.MIN_NAME_LENGTH}자 이상 ${Car.MAX_NAME_LENGTH}자 이하만 가능합니다.`,
        INVALID_NAMES: "자동차 이름 목록이 올바르지 않습니다."
    };

    constructor(name, acceleration) {
        if (!Car.isValidName(name)) {
            throw new Error(Car.ERROR_MESSAGES.INVALID_NAME);
        }
        this.name = name;
        this.position = 0;
        this.acceleration = acceleration;
    }

    moveForward() {
        if (!this.acceleration.canAccelerate()) {
            return;
        }
        this.position += 1;
    }

    static isValidName(name) {
        return name.length >= this.MIN_NAME_LENGTH && name.length <= this.MAX_NAME_LENGTH;
    }

    static createCars(names, acceleration) {
        if (!names || !Array.isArray(names)) {
            throw new Error(Car.ERROR_MESSAGES.INVALID_NAMES);
        }
        return names.map((name) => new Car(name, acceleration));
    }
}

export default Car;
