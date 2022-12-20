import { Car, validateName } from './Car.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';
import { TRIAL_COUNT_MIN } from '../constant/racingcar.js';
import { getDataType } from '../utils/dataType.js';
import RacingGame from './RacingGame.js';

const isUnique = inputNames => inputNames.length === new Set(inputNames).size;

class Cars {
  carList;

  trialCount;

  result;

  winners;

  constructor() {
    this.carList = [];
    this.trialCount = 0;
    this.result = [];
    this.winners = [];
  }

  setCarNames(carNameList) {
    this.validateNames(carNameList);
    carNameList.forEach(carName => validateName(carName));
    this.carList = carNameList.map(carName => new Car(carName));
  }

  setTrialCount(trialCount) {
    this.validTrialCount(trialCount);
    this.trialCount = trialCount;
  }

  validateNames = carNameList => {
    if (!isUnique(carNameList)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
    return true;
  };

  validTrialCount = trialCount => {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    if (getDataType(trialCount) !== 'Number') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  };

  generateGame = () => {
    const racingGame = new RacingGame(this.carList, this.trialCount);
    racingGame.run();
    this.result = racingGame.getResult();
    this.winners = racingGame.getWinners();
  };

  resetAll = () => {
    this.carList = [];
    this.trialCount = 0;
    this.result = [];
    this.winners = [];
  };
}

const cars = new Cars();

export default cars;
