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
} from "./constants";

export class Car {
  #name;
  #position = 0;
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
