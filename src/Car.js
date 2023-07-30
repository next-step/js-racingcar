import {
  CAR_INIT_POSITION,
  CAR_MOVE_STEP,
  CAN_MOVE,
  CAR_NAME_MAX_LENGTH,
  ERROR_MESSAGE,
} from "./constants/settings";
export default class Car {
  #name;
  #position;

  constructor(name, position = CAR_INIT_POSITION) {
    this.validateName(name);

    this.#name = name;
    this.#position = position;
  }

  validateName(name) {
    if (name.length > CAR_NAME_MAX_LENGTH)
      throw new Error(ERROR_MESSAGE.LONG_CAR_NAME);

    return;
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
