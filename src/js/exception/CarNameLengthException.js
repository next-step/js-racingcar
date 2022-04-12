import Car from "../domain/Car.js";

export default class CarNameLengthException extends Error {
    constructor() {
        super(Car.OUT_OF_NAME_LENGTH);
    }
}
