import Car from "./Car.js";
import { getRandomNumber } from "../utils/number.js";
import { CAR, ERROR_MESSAGE, RACE } from "../constant/index.js";

export default class Race {
  #cars = [];
  #maxRound;
  #records = [];
  #winners;

  constructor() {
    this.#cars;
    this.#maxRound;
    this.#records;
    this.#winners;
  }

  #recordRound() {
    const roundRecord = [];

    this.#cars.forEach((car) => roundRecord.push(car));
    this.#records.push(roundRecord);
  }

  playRound() {
    this.cars.forEach((car) => {
      car.move(getRandomNumber(CAR.MIN_RANDOM_NUMBER, CAR.MAX_RANDOM_NUMBER));
    });
    this.#recordRound();
  }

  validateMaxRoundRequired(round) {
    if (round === "") {
      throw new Error(ERROR_MESSAGE.RACE_ROUND_REQUIRED);
    }
  }

  #validateMaxRoundNumber(round) {
    if (isNaN(round)) {
      throw new Error(ERROR_MESSAGE.RACE_ROUND_NUMBER);
    }
  }

  #validateMaxRoundNaturalNumber(round) {
    if (Math.floor(round) !== round) {
      throw new Error(ERROR_MESSAGE.RACE_ROUND_NATURAL_NUMBER);
    }
  }

  #validateMaxRoundMoreThanZero(round) {
    if (round < RACE.MIN_ROUND) {
      throw new Error(ERROR_MESSAGE.RACE_ROUND_MORE_THAN_ZERO);
    }
  }

  #validateMaxRound(round) {
    this.#validateMaxRoundNumber(round);
    this.#validateMaxRoundNaturalNumber(round);
    this.#validateMaxRoundMoreThanZero(round);
  }

  set cars(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
  }

  get cars() {
    return this.#cars;
  }

  set maxRound(round) {
    this.#validateMaxRound(round);
    this.#maxRound = round;
  }

  get maxRound() {
    return this.#maxRound;
  }

  get currentRoundRecord() {
    return this.#records[this.#records.length - 1];
  }

  get records() {
    return this.#records;
  }

  get winners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((car) => car.position === maxPosition);
  }
}
