import { CAR } from "../constants/error.js";
import {
  CAR_NAME_MAX_LENGTH,
  DRIVE_MIN_POSITION,
} from "../constants/number.js";

export default class Car {
  name;
  position = 0;

  constructor(name, position) {
    this.#isValidateName(name);
    this.name = name;
    if (position !== undefined) {
      this.position = position;
    }
  }

  drive(randomNumber) {
    if (randomNumber >= DRIVE_MIN_POSITION) this.position++;
  }

  #isValidateName(checkString) {
    if (checkString.trim() == false) throw new Error(CAR.NAME_EMPTY);

    if (checkString.length > CAR_NAME_MAX_LENGTH)
      throw new Error(CAR.NAME_LENGTH_EXCEED);
  }
}
