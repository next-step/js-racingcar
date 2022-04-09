import ValidationError from '../utils/validation.js';
import { ERROR } from '../constants/message.js';
import { MAX_RACING_CAR_NAME } from '../constants/unit.js';
import { MovingStrategy, RandomMovingStrategy } from './MovingStrategy.js';

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
        this.#isStepForward(new RandomMovingStrategy())
      );
      return acc;
    }, {});
  }

  #isValidCarName = inputNames => {
    const isValid = inputNames.every(
      carName => carName.length > 0 && carName.length <= MAX_RACING_CAR_NAME
    );

    if (!isValid)
      throw new ValidationError(ERROR.INVALID_LENGTH_RACING_CAR_NAME);
  };

  #isStepForward(movingStrategy) {
    if (!(movingStrategy instanceof MovingStrategy))
      throw Error('MovingStrategy 안스턴스 인자만 받을 수 있습니다.');
    return movingStrategy.isMoveable() ? 1 : 0;
  }

  updateCarNames = carNames => {
    try {
      this.#isValidCarName(carNames);
      this.#carNames = carNames;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  updatePlayTimes = playTimes => {
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
