// import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
// import { getDataType } from '../utils/dataType.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

// class CarName {
//   isInRange = name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX;

//   validateName = carName => {
//     if (!this.isInRange(carName)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
//     if (getDataType(carName) !== 'String') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
//     return true;
//   };
// }

// const carName = new CarName();
// Object.freeze(carName);
// export default carName;

class CarName {
  static #MIN = 1;

  static #MAX = 5;

  #value;

  constructor(value) {
    this.#value = value;
    this.#validateType();
    this.#validateRange();
  }

  #validateRange() {
    const size = this.#value.length;
    if (size >= CarName.#MIN && size <= CarName.#MAX) {
      return;
    }
    throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
  }

  #validateType() {
    if (typeof this.#value === 'string') {
      return;
    }
    throw new Error(ERROR_MESSAGES.INVALID_TYPE);
  }

  get value() {
    return this.#value;
  }
}

export default CarName;
