import { Car } from "./Car";
import { makeRandomNumber } from '../utils';

export class Racing {
    static MAX_ROUND = 5;
    _cars = [];
    _maxRound;
    _currentRound;

    constructor(carNames) {
        this.validateCarNames(carNames);
        this._cars = carNames.split(',').map((name) => new Car(name));
        this._currentRound = 1;
    }

    validateCarNames(carNames) {
        carNames.split(',').forEach((name) => {
            if(!name.trim().length) {
                throw new Error('Car name should not be empty');
            }
        })
    }

    race() {
        if(this._currentRound >= Racing.MAX_ROUND) {
            return;
        }
        
        const MIN = 1;
        const MAX = 9;
        this._cars.forEach((car) => {
            car.move(makeRandomNumber(MIN, MAX));
        });

        this._currentRound += 1;
    }

    get cars() {
        return this._cars;
    }

    get currentRound() {
        return this._currentRound;
    }

    get winners() {
        const maxDistance = Math.max(...this._cars.map((car) => car.position));
        return this._cars.filter((car) => car.position === maxDistance);
    }
}