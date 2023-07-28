import {
  CAR_INIT_POSITION,
  CAR_MOVE_STEP,
  CAN_MOVE,
} from "./constants/settings";
export default class Car {
  #name;
  #position;

  constructor(name, position = CAR_INIT_POSITION) {
    this.#name = name;
    this.#position = position;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  #move() {
    this.#position += CAR_MOVE_STEP;
  }

  tryMoveWith(randomNumber) {
    if (CAN_MOVE(randomNumber)) {
      this.#move();
    }
  }
}
