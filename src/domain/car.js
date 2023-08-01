
import { Message, Qusetion, ErrorMessage } from '../constants/message.js'
import { isAlphabet } from '../utils/utils.js'



export default class Car {
    #name;
    #position = Message.DEFAULT_POSITION;
    #count
    constructor(name) {
        this.validateName(name);
        this.#name = name;
    }

    carCount(count){
        return this.#count = count;
    }

    validateName(name) {
        if (name.length > Message.CAR_NAME_MAX_LENGTH) {
            throw new Error(ErrorMessage.CAR_MAX_LENGTH);
        }

        if (name.length < Message.CAR_NAME_MIN_LENGTH) {
            throw new Error(ErrorMessage.CAR_MIN_LENGTH);
        }

        if (!isAlphabet(name)) {
            throw new Error(ErrorMessage.CAR_NAME_ALPHABET);
        }
    }

    getName() {
        return this.#name;
    }

    getPosition() {
        return this.#position;
    }

    run(number) {
        if (number >= Message.RUN_THRESHOLD) {
            this.#position += Message.CAR_RUN_UNIT;
        }
    }

    randomNumber() {
        return Math.floor(Math.random() * 10);
    }

    raceResult(winners) {
        return console.log(`\n${winners.join(', ')}가 최종 우승했습니다.`);
    }

    carPositions(cars) {
        cars.forEach((car) => {
            console.log(`${car.getName()}: ${'-'.repeat(car.getPosition())}`);
        });
    }

    getCarName(){
        const carNamesInput = this.#name;
        const carNames = carNamesInput.split(',').map((name) => name.trim());
        return carNames
    }

    startRace() {
        const carNames = this.getCarName();
        const cars = carNames.map((name) => new Car(name));
        const rounds = this.#count || Message.RACE_COUNT;

        for (let round = 1; round <= rounds; round++) {
            cars.forEach((car) => {
                const randomValue = car.randomNumber();
                car.run(randomValue);
            });
            this.carPositions(cars);
        }

        const winners = this.getWinners(cars);
        this.raceResult(winners);
    }

    getWinners(cars) {
        const maxPosition = Math.max(...cars.map((car) => car.getPosition()));
        return cars.filter((car) => car.getPosition() === maxPosition).map((car) => car.getName());
    }
}