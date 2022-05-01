import CAR_VALIDATION from '../constants/carValidation.js';
import MESSAGE from '../constants/message.js';

export class Car {
  #carName;
  #position = 0;

  constructor(carName) {
    if (!this.isCorrectLength(carName)) {
      throw MESSAGE.ERROR_CAR_NAMES_INPUT;
    }
    this.#carName = carName;
  }

  get carName() {
    return this.#carName;
  }

  get position() {
    return this.#position;
  }
  set position(position) {
    this.#position = position;
  }
  isCorrectLength(carName) {
    return (
      carName.length <= CAR_VALIDATION.MAX_CAR_NAME_LENTH &&
      carName.length >= CAR_VALIDATION.MIN_CAR_NAME_LENTH
    );
  }

  createForwardNumber() {
    return (
      Math.floor(
        Math.random() * (CAR_VALIDATION.MAX_FORWARD_NUMBER - CAR_VALIDATION.MIN_FORWARD_NUMBER + 1)
      ) + CAR_VALIDATION.MIN_FORWARD_NUMBER
    );
  }
}
