
import { Message, Qusetion } from '../constants/message.js'

const ERROR = Object.freeze({
    CAR_MAX_LENGTH: (MAX_LENGTH) =>
        `자동차 이름은 ${MAX_LENGTH}글자 이하만 가능하다.`,
    CAR_MIN_LENGTH: (MIN_LENGTH) => `
  자동차 이름을 ${MIN_LENGTH}글자 이상만 가능하다.
  `,
    CAR_NAME_ALPHABET: "자동차 이름은 영어 문자열만 가능하다.",
});

const isAlphabet = (str) => {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(str);
};

export default class Car {
    #name;
    #position = Message.DEFAULT_POSITION;

    constructor(name) {
        this.validateName(name);
        this.#name = name;
    }

    validateName(name) {
        if (name.length > Message.CAR_NAME_MAX_LENGTH) {
            throw new Error(ERROR.CAR_MAX_LENGTH(Message.CAR_NAME_MAX_LENGTH));
        }

        if (name.length < Message.CAR_NAME_MIN_LENGTH) {
            throw new Error(ERROR.CAR_MIN_LENGTH(Message.CAR_NAME_MIN_LENGTH));
        }

        if (!isAlphabet(name)) {
            throw new Error(ERROR.CAR_NAME_ALPHABET);
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

    startRace() {
        const carNamesInput = prompt(Message.Qusetion);
        const carNames = carNamesInput.split(',').map((name) => name.trim());

        const cars = carNames.map((name) => new Car(name));
        const rounds = Message.RACE_COUNT;

        for (let round = 1; round <= rounds; round++) {
            cars.forEach((car) => {
                const randomValue = car.randomNumber();
                car.run(randomValue);
            });
            carPositions(cars);
        }

        const winners = this.getWinners(cars);
        this.raceResult(winners);
    }

    getWinners(cars) {
        const maxPosition = Math.max(...cars.map((car) => car.getPosition()));
        return cars.filter((car) => car.getPosition() === maxPosition).map((car) => car.getName());
    }
}