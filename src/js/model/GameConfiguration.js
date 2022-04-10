import ValidationError from '../utils/validation.js';
import {
  CarNameConfigurationStrategy,
  ConfigurationStrategy,
  PlayTimeConfigurationStrategy,
  StepForwardConfigurationStrategy,
} from './GameConfigurationStrategy.js';

export default class GameConfiguration {
  #carNames;
  #playTimes;
  #racingCarList;

  static createGameConfiguration() {
    return new GameConfiguration();
  }

  makePlayResult() {
    this.#racingCarList = this.carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.playTimes }, () =>
        this.#isStepForward(new StepForwardConfigurationStrategy())
      );
      return acc;
    }, {});
  }

  #isValidCarName = carNameConfigurationStrategy => {
    if (!(carNameConfigurationStrategy instanceof ConfigurationStrategy))
      throw Error('ConfigurationStrategy 인스턴스의 인자만 받을 수 있습니다.');

    return carNameConfigurationStrategy.isValidCarName();
  };

  #isStepForward(movingStrategy) {
    if (!(movingStrategy instanceof ConfigurationStrategy))
      throw Error('ConfigurationStrategy 인스턴스의 인자만 받을 수 있습니다.');

    return movingStrategy.isMoveable() ? 1 : 0;
  }

  updateCarNames = carNames => {
    try {
      this.#isValidCarName(new CarNameConfigurationStrategy(carNames));
      this.#carNames = carNames;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  updatePlayTimes = playTimes => {
    const playTimesInstance = new PlayTimeConfigurationStrategy(playTimes);
    playTimesInstance.isValidPlayTime();

    if (!(playTimesInstance instanceof ConfigurationStrategy))
      throw Error('ConfigurationStrategy  인스턴스의 인자만 받을 수 있습니다.');

    this.#playTimes = playTimes;
  };

  consumeTime = () => {
    this.#playTimes -= 1;
  };

  get carNames() {
    return this.#carNames;
  }

  get playTimes() {
    return this.#playTimes;
  }

  get racingCarList() {
    return this.#racingCarList;
  }
}
