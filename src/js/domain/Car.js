import { CarNameLengthException } from "../exception/CarNameLengthException.js";

export class Car {
    #name;
    #forwardCount = 0;

    static MIN_LENGTH = 1;
    static MAX_LENGTH = 5;
    constructor(name) {
        Car.validate(name);
        this.#name = name;
    }

    get value() {
        return this.#name;
    }

    static validate(name) {
        if (name.length < Car.MIN_LENGTH || name.length > Car.MAX_LENGTH) {
            throw new CarNameLengthException();
        }
    }
}
