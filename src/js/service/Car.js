import { CAR_STATE, ERROR, CAR_NAME } from '../constants/index.js';

class Car {
  $carName;
  $processCount;
  constructor(carName) {
    try {
      const errorMessage = this.checkCarNameIsValid(carName);
      if (errorMessage) {
        throw errorMessage;
      }

      this.$carName = carName;
      this.$processCount = 0;
    } catch (errorMessage) {
      alert(errorMessage);
    }
  }

  get name() {
    return this.$carName;
  }

  get processCount() {
    return this.$processCount;
  }

  get isWinner() {
    return this.$isWinner;
  }

  checkCarNameIsValid(carName) {
    if (!carName) {
      return ERROR.NAME_EMPTY;
    }

    if (carName.length > CAR_NAME.MAX_LENGTH) {
      return ERROR.NAME_MAX_LENGTH;
    }

    return null;
  }

  forwardCar(count) {
    while (count > 0) {
      const random = Math.floor(Math.random() * CAR_STATE.MAX_RANDOM_NUMBER);

      count--;
      if (random > CAR_STATE.MAX_STOP_VALUE) {
        this.$processCount++;
      }
      this.forwardCar();
    }
  }
}

export default Car;
