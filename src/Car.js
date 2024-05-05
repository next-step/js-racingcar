import { MESSAGE } from "../constants/message";

const MOVE_THRESHOLD = 4;
const NAME_LENGTH_MAX = 5;

export default class Car {
  constructor(name, position = 0) {
    if (name.length > NAME_LENGTH_MAX) {
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

  printPosition() {
    console.log(`${this.name} : ${"-".repeat(this.position)}`);
  }
}
