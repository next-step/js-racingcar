import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { ERROR } from '../constants/message.js';
import ValidationError from '../utils/validation.js';

class ConfigurationStrategy {
  build() {
    throw new Error(
      'ConfigurationStrategy는 추상 클래스입니다. 별도의 구현을 통한 접근이 필요합니다.'
    );
  }

  isMoveable() {
    throw new Error(
      'ConfigurationStrategy는 추상 클래스입니다. 별도의 구현을 통한 접근이 필요합니다.'
    );
  }

  isValidCarName() {
    throw new Error(
      'ConfigurationStrategy는 추상 클래스입니다. 별도의 구현을 통한 접근이 필요합니다.'
    );
  }

  isValidPlayTime() {
    throw new Error(
      'ConfigurationStrategy는 추상 클래스입니다. 별도의 구현을 통한 접근이 필요합니다.'
    );
  }
}

class StepForwardConfigurationStrategy extends ConfigurationStrategy {
  static build() {
    return new StepForwardConfigurationStrategy();
  }

  isMoveable() {
    return Math.random() * 10 > 4;
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
    if (!isValid)
      throw new ValidationError('시도할 횟수는 숫자로 입력하여 주세요!');
  }
}

export {
  ConfigurationStrategy,
  CarNameConfigurationStrategy,
  StepForwardConfigurationStrategy,
  PlayTimeConfigurationStrategy,
};
