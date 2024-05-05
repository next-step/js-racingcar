import { MESSAGE } from "../constants/message";

const MOVE_THRESHOLD = 4;

export class Car {
  constructor(name, position = 0) {
    if (name.length > 5) {
      throw new Error(MESSAGE.NAME_LENGTH_ERROR);
    }

    this.name = name;
    this.position = position;
  }

  move(value) {
    if (value >= MOVE_THRESHOLD) {
      this.position++;
    }
  }
}
