import {
  DEFAULT_POSITION,
  MOVE_UNIT,
  FORWARD_CONDITION,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from "./contants/car";
import { ERROR_MSG } from "./contants/messages";
import { isAlphabet } from "./utils/validator";

export default class Car {
  #name;
  #position = DEFAULT_POSITION;

  constructor(name) {
    try {
      this.validateName(name);

      this.#name = name;
    } catch (err) {
      throw new Error(err);
    }
  }

  validateName(name) {
    if (name.length > NAME_MAX_LENGTH) {
      throw new Error(ERROR_MSG.MAX_LENGTH(NAME_MAX_LENGTH));
    }

    if (name === "") {
      throw new Error(ERROR_MSG.MIN_LENGTH(NAME_MIN_LENGTH));
    }

    if (!isAlphabet(name)) {
      throw new Error(ERROR_MSG.PATTERN);
    }
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  move(condition) {
    if (condition >= FORWARD_CONDITION) {
      this.#position += MOVE_UNIT;
    }
  }
}
