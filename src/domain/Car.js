export class Car {
    static CAR_NAME_MAX_LENGTH = 5;
    static DEFAULT_CAR_POISITION = 0;
    static MIN_MOVABLE_NUMBER = 4;
    _name;
    _position;

    constructor(name) {
        this.validateName(name);
        this._name = name;
        this._position = Car.DEFAULT_CAR_POISITION;
    }

    validateName(name) {
        if(!name.trim().length) {
            throw new Error('Car name should not be empty');
        }


        if (name.length > Car.CAR_NAME_MAX_LENGTH) {
            throw new Error(`Car name length should be less than ${Car.CAR_NAME_MAX_LENGTH}`);
        }
    }

    move(number) {
        if(this.canMove(number)) {
            this._position += 1;
        }
    }

    canMove(number) {
        return number >= Car.MIN_MOVABLE_NUMBER;
    }

    get position() {
        return this._position;
    }

    get name() {
        return this._name;
    }
}