import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { ERROR } from '../constants/message.js';
import ValidationError from '../utils/validation.js';

class ConfigurationStrategy {
  isMoveable() {
    throw new Error(
      'ConfigurationStrategy는 추상 클래스입니다. 별도의 구현을 통한 접근이 필요합니다.'
    );
  }
}

class CarNameConfigurationStrategy extends ConfigurationStrategy {
  #inputNames;

  constructor(inputNames) {
    super();
    this.#inputNames = inputNames;
  }

  isValidCarName() {
    const isValid = this.#inputNames.every(
      carName => carName.length > 0 && carName.length <= MAX_RACING_CAR_NAME
    );

    if (!isValid)
      throw new ValidationError(ERROR.INVALID_LENGTH_RACING_CAR_NAME);

    return isValid;
  }
}

class StepForwardConfigurationStrategy extends ConfigurationStrategy {
  isMoveable() {
    return Math.random() * 10 > 4;
  }
}

class PlayTimeConfigurationStrategy extends ConfigurationStrategy {
  #playTimes;

  constructor(playTimes) {
    super();
    this.#playTimes = Number(playTimes);
  }

  isValidPlayTime() {
    return Number.isInteger(this.#playTimes) && !Number.isNaN(this.#playTimes);
  }
}

export {
  ConfigurationStrategy,
  CarNameConfigurationStrategy,
  StepForwardConfigurationStrategy,
  PlayTimeConfigurationStrategy,
};
