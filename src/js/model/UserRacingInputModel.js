import ValidationError from '../utils/validation.js';
import {
  CarNameConfigurationStrategy,
  PlayTimeConfigurationStrategy,
  StepForwardConfigurationStrategy,
} from './GameConfigurationStrategy.js';

export default class UserRacingInputModel {
  #carNames;
  #playTimes;
  #racingCarList;

  static instance;

  static getInstance() {
    if (!this.instance) this.instance = new UserRacingInputModel();
    return this.instance;
  }

  makePlayResult() {
    this.#racingCarList = this.#carNames.reduce((acc, cur) => {
      acc[cur] = Array.from({ length: this.#playTimes }, () =>
        this.#isStepForward(StepForwardConfigurationStrategy.build())
      );
      return acc;
    }, {});
  }

  #isStepForward(movingStrategy) {
    return movingStrategy.isMoveable() ? 1 : 0;
  }

  updateCarNames = carNames => {
    try {
      CarNameConfigurationStrategy.build()
        .inputNames(carNames)
        .isValidCarName();

      this.#carNames = carNames;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  updatePlayTimes = playTimes => {
    try {
      PlayTimeConfigurationStrategy.build()
        .playTimes(playTimes)
        .isValidPlayTime();

      this.#playTimes = playTimes;
    } catch (err) {
      if (err instanceof ValidationError) alert(err.message);
      console.log(err);
    }
  };

  createProcessSettingData() {
    const gameProcessSettingData = {
      playTimes: this.#playTimes,
      carNames: this.#carNames,
      racingCarList: this.#racingCarList,
    };

    return new GameProcessSettingData(gameProcessSettingData);
  }
}

class GameProcessSettingData extends UserRacingInputModel {
  constructor(gameProcessSettingData) {
    super();
    this.playTimes = gameProcessSettingData.playTimes;
    this.leftPlayTime = gameProcessSettingData.playTimes;
    this.carNames = gameProcessSettingData.carNames;
    this.racingCarList = gameProcessSettingData.racingCarList;
  }
}
