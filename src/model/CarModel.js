import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants";

function validateName(name) {
  if (name.length > CONDITIONS.max_car_name_length) {
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
    if (CONDITIONS.can_move_number <= number) {
      this.#movement += 1;
    }
  }
}
