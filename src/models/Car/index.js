import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_REQUIRED_ERROR_MESSAGE,
  CAR_NAME_MAX_LENGTH_ERROR_MESSAGE,
  CAR_RANDOM_UPPER_BOUND,
  CAR_MOVE_THRESHOLD,
} from './constant.js';

export class Car {
  #name;
  #location = 0;

  constructor(name) {
    if (!name || !name.trim()) {
      throw new Error(CAR_NAME_REQUIRED_ERROR_MESSAGE);
    }
    if (name.trim().length > CAR_NAME_MAX_LENGTH) {
      throw new Error(CAR_NAME_MAX_LENGTH_ERROR_MESSAGE);
    }

    this.#name = name.trim();
  }

  #canMove() {
    return getRandomInt(0, CAR_RANDOM_UPPER_BOUND) >= CAR_MOVE_THRESHOLD;
  }

  move() {
    if (!this.#canMove()) {
      return;
    }

    this.#location += 1;
  }

  get information() {
    return {
      name: this.#name,
      location: this.#location,
    };
  }
}

export function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
