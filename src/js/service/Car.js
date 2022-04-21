import { CAR_STATE, ERROR, CAR_NAME } from '../constants/index.js';

class Car {
  $carName;
  $processCount;
  $status;
  constructor(carName) {
    try {
      const errorMessage = this.checkCarNameIsValid(carName);
      if (errorMessage) {
        throw errorMessage;
      }

      this.$carName = carName;
      this.$processCount = 0;
      this.$status = CAR_STATE.STOP;
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

  get status() {
    return this.$status;
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

  forwardCar() {
    this.$status = CAR_STATE.FORWARD;
    const random = Math.floor(Math.random() * CAR_STATE.MAX_RANDOM_NUMBER);

    if (random > CAR_STATE.MAX_STOP_VALUE) {
      this.$processCount++;
      return;
    }
    this.$status = CAR_STATE.STOP;
  }

  parkingCar() {
    this.$status = CAR_STATE.PARK;
  }
}

export default Car;
