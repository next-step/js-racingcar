import { CAR } from "../constants/error.js";
import {
  CAR_NAME_MAX_LENGTH,
  DRIVE_MIN_POSITION,
} from "../constants/number.js";

export default class Car {
  name;
  position = 0;

  constructor(name) {
    if (!this.isValidName(name)) throw new Error(CAR.NAME_LENGTH_EXCEED);

    this.name = name;
  }

  drive(randomNumber) {
    if (randomNumber >= DRIVE_MIN_POSITION) this.position++;
  }

  isValidName(checkString) {
    if (checkString.trim() === false) return false;

    if (checkString.length > CAR_NAME_MAX_LENGTH) return false;

    return true;
  }
}
