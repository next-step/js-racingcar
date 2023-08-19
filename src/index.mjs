import {
  MAX_LENGTH,
  MAX_NUM,
  MIN_LENGTH,
  MIN_NUM,
  MOVE_CONDITION,
  MOVE_DISTANCE,
  NAME_ERROR_MESSAGE,
  NOT_ALLOW_CHARACTER,
  NUM_ERROR_MESSAGE,
  RACE_COUNT,
} from "./constants.mjs";

export class Car {
  #name;
  #position = 1;
  constructor(name) {
    this.validateName(name);
    this.#name = name;
  }

  run(num) {
    this.validateNumber(num);
    if (num >= MOVE_CONDITION) {
      this.#position += MOVE_DISTANCE;
    }
  }
  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  validateName(name) {
    if (typeof name !== "string") {
      throw new Error(NAME_ERROR_MESSAGE.NOT_STRING);
    }
    if (name.includes(NOT_ALLOW_CHARACTER)) {
      throw new Error(NAME_ERROR_MESSAGE.NOT_ALLOW_CHARACTER);
    }
    if (name.length < MIN_LENGTH || name.length > MAX_LENGTH) {
      throw new Error(NAME_ERROR_MESSAGE.NOT_IN_RANGE);
    }
  }

  validateNumber(num) {
    if (typeof num !== "number") {
      throw new Error(NUM_ERROR_MESSAGE.NOT_NUMBER);
    }
    if (num < MIN_NUM || num > MAX_NUM) {
      throw new Error(NUM_ERROR_MESSAGE.NOT_IN_RANGE);
    }
  }
}

export class Race {
  #cars;
  #isStarted = false;
  constructor(cars) {
    this.#cars = cars;
  }
  getCars() {
    return this.#cars;
  }
  *start() {
    this.#isStarted = true;
    for (let i = 0; i < RACE_COUNT; i++) {
      for (let j = 0; j < this.#cars.length; j++) {
        const car = this.#cars[j];
        car.run(this.generateRandomNum());
      }
      yield this.#cars;
    }
    this.#isStarted = false;
  }
  getResult() {
    return this.#cars.filter((car) => car.getPosition() === RACE_COUNT);
  }

  getStarted() {
    return this.#isStarted;
  }

  generateRandomNum() {
    return Math.floor(Math.random() * 10);
  }
}
