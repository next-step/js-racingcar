export class Car {
    static CAR_NAME_MAX_LENGTH = 5;
    static DEFAULT_CAR_POISITION = 0;
    _name;
    _position;

    constructor(name) {
        this._name = name;
        this._position = Car.DEFAULT_CAR_POISITION;
    }
}