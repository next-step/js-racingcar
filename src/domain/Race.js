import Car from "./Car.js";
import { getRandomNumber } from "../utils/number.js";
import { CAR, RACE } from "../constant/index.js";

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

  set cars(carNames) {
    this.#cars = carNames.map((name) => new Car(name));
  }

  get cars() {
    return this.#cars;
  }

  set maxRound(round) {
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
