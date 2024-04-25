import { ERROR_EMPTY_CAR_NAME, ERROR_LONG_CAR_NAME } from "../constants";

export class Car {
  constructor(name) {
    if (!name.length) {
      throw new Error(ERROR_EMPTY_CAR_NAME);
    }
    if (name.length > 5) {
      throw new Error(ERROR_LONG_CAR_NAME);
    }
    this.name = name;
  }
}
