import CarNames from "../domain/CarNames.js";

export default class CarNameLengthException extends Error {
    constructor() {
        super(CarNames.OUT_OF_NAME_LENGTH);
    }
}
