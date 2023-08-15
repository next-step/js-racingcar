const MOVE_DISTANCE = 1;
const MOVE_CONDITION = 4;

export default class Car {
  #name;
  #position = 0;
  constructor(name) {
    this.#name = name;
  }

  run(num) {
    if (num >= MOVE_CONDITION) {
      this.#position += MOVE_DISTANCE;
    }
  }
  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }
}
