import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants.js";

function validateName(name) {
  if (name.length > CONDITIONS.CAR_MAX_NAME_LENGTH) {
    throw new Error(ERROR_MESSAGES.OVER_MAXIMUM_CAR_NAME_LENGTH);
  }

  if (!name) {
    throw new Error(ERROR_MESSAGES.WHITE_CAR_NAME);
  }
}
export default class CarModel {
  #name = "";

  #movement = 0;

  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.#name;
  }

  set name(aName) {
    const name = aName.trim();
    validateName(name);
    this.#name = name;
  }

  get movement() {
    return this.#movement;
  }

  go(number) {
    if (CONDITIONS.CAR_CAN_MOVE_NUMBER <= number) {
      this.#movement += 1;
    }
  }
}
