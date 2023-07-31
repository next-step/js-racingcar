import {
  CAR_INIT_POSITION,
  CAR_ERROR_MESSAGE,
  CAR_MOVE_STEP,
  CAN_MOVE,
  CAR_NAME_MAX_LENGTH,
} from "./constants/gameController";
export default class Car {
  #name;
  #position;

  constructor(name, position = CAR_INIT_POSITION) {
    this.validateName(name);

    this.#name = name;
    this.#position = position;
  }

  validateName(name) {
    if (!name) throw new Error(CAR_ERROR_MESSAGE.EMPTY_NAME);

    if (name.length > CAR_NAME_MAX_LENGTH)
      throw new Error(CAR_ERROR_MESSAGE.LONG_NAME);

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
