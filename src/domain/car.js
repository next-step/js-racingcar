import {
  ValidationError,
  nameLengthErrorMessage,
  nameTypeErrorMessage,
  moveBackwardErrorMessage,
} from '../shared/validationError.js';

class Car {
  static maxNameSize = 5;

  static minNameSize = 1;

  name = '';

  #location = 0;

  constructor(name) {
    Car.validationName(name);
    this.name = name;
  }

  static validationName(name) {
    if (typeof name !== 'string') {
      throw new ValidationError(nameTypeErrorMessage);
    }
    if (name.length < Car.minNameSize || name.length > Car.maxNameSize) {
      throw new ValidationError(nameLengthErrorMessage);
    }
  }

  static validationLocation(location) {
    if (location === 0) {
      throw new ValidationError(moveBackwardErrorMessage);
    }
  }

  moveForward() {
    this.#location += 1;
  }

  moveBackward() {
    Car.validationLocation(this.#location);
    this.#location -= 1;
  }

  getLocation() {
    return this.#location;
  }

  getName() {
    return this.name;
  }
}

export default Car;
