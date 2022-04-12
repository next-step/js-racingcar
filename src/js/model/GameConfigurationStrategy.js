import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { ERROR } from '../constants/message.js';
import ValidationError from '../utils/validation.js';

class ConfigurationStrategy {
  build() {
    throw new Error(ERROR.ABSTRACT_CLASS);
  }

  isValidCarName() {
    throw new Error(ERROR.ABSTRACT_CLASS);
  }

  isValidPlayTime() {
    throw new Error(ERROR.ABSTRACT_CLASS);
  }
}

class CarNameConfigurationStrategy extends ConfigurationStrategy {
  #inputNames;

  constructor(inputNames) {
    super();
    this.#inputNames = inputNames;
  }

  static build() {
    return new CarNameConfigurationStrategy(this.inputNames);
  }

  inputNames(inputNames) {
    this.#inputNames = inputNames;
    return this;
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

class PlayTimeConfigurationStrategy extends ConfigurationStrategy {
  #playTimes;

  static build() {
    return new PlayTimeConfigurationStrategy(this.playTimes);
  }

  playTimes(playTimes) {
    this.#playTimes = Number(playTimes);
    return this;
  }

  isValidPlayTime() {
    const isValid =
      Number.isInteger(this.#playTimes) && !Number.isNaN(this.#playTimes);
    if (!isValid) throw new ValidationError(ERROR.INVALID_TYPE_PLAY_TIME);
  }
}

export {
  ConfigurationStrategy,
  CarNameConfigurationStrategy,
  PlayTimeConfigurationStrategy,
};
