import { CONDITIONS, ERROR_MESSAGES } from "../constants.js";

export class CarModel {
  #name = "";
  #movement = 0;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(aName) {
    if (aName.length > CONDITIONS.max_name_length) {
      throw new Error(ERROR_MESSAGES.OVER_MAXIMUM_NAME_LENGTH);
    }
    let name = aName.trim();
    if (!name) {
      throw new Error(ERROR_MESSAGES.WHITE_NAME);
    }

    this.#name = name;
  }

  get movement() {
    return this.#movement;
  }

  go(number) {
    if (CONDITIONS.can_move_number <= number) {
      this.#movement += 1;
    }
  }
}
