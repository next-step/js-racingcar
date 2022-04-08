import CarNames from "../domain/CarNames.js";

export default class CarNameNotExistException extends Error {
    constructor() {
        super(CarNames.NOT_EXIST_NAME);
    }
}
