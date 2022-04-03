import { CarNameLengthException } from "../exception/CarNameLengthException.js";

export class Car {
    #name;
    #forwardCount = 0;

    static CAR_NAME_MIN_LENGTH = 1;
    static CAR_NAME_MAX_LENGTH = 5;
    static MAX_RANDOM_VALUE = 10;
    static FORWARD_VALUE = 4;

    constructor(name) {
        console.log(name);
        Car.validate(name);
        this.#name = name;
    }

    get value() {
        return this.#name;
    }

    static validate(name) {
        if (name.length < Car.CAR_NAME_MIN_LENGTH || name.length > Car.CAR_NAME_MAX_LENGTH) {
            throw new CarNameLengthException();
        }
    }

    setForwardCount() {
        this.#forwardCount++;
    }
}
