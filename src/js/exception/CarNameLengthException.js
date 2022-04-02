import { CarNames } from "../domain/CarNames.js";

export class CarNameLengthException extends Error {
    constructor() {
        super(CarNames.NOT_EXIST_NAME);
    }
}
