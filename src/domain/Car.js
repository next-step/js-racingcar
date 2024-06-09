import { CAR } from "../constants/error.js";
import {
  CAR_NAME_MAX_LENGTH,
  DRIVE_MIN_POSITION,
} from "../constants/number.js";

export default class Car {
  name;
  position;

  constructor(name, position = 0) {
    this.#isValidateName(name);
    this.name = name;
    this.position = position;
  }

  drive(randomNumber) {
    if (randomNumber >= DRIVE_MIN_POSITION) this.position++;
  }

  #isValidateName(checkString) {
    const regEx = /\s/g;
    if (regEx.test(checkString)) throw new Error(CAR.NAME_EMPTY);

    if (checkString.length > CAR_NAME_MAX_LENGTH)
      throw new Error(CAR.NAME_LENGTH_EXCEED);
  }
}
