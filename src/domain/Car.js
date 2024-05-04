import { CAR } from "../constants/error.js";
import {
  CAR_NAME_MAX_LENGTH,
  DRIVE_MIN_POSITION,
} from "../constants/number.js";

export default class Car {
  name;
  position;

  constructor(name) {
    this.checkName(name);
    this.name = name;
    this.position = 0;
  }

  drive(randomNumber) {
    if (randomNumber >= DRIVE_MIN_POSITION) this.position++;
  }

  checkName(checkString) {
    if (checkString.length > CAR_NAME_MAX_LENGTH)
      throw new Error(CAR.NAME_LENGTH_EXCEED);

    if (checkString.trim() === false) throw new Error(CAR.NAME_EMPTY);
  }
}
