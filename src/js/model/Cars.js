import { Car } from './Car.js';
import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
import { getDataType } from '../utils/dataType.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const isInRange = names =>
  names.every(name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX);

const isUnique = inputNames => inputNames.length === new Set(inputNames).size;

class Cars {
  #carList;

  #names;

  #trialCount;

  #gameResult;

  #winners;

  constructor() {
    this.#names = [];
    this.#trialCount = 0;
    this.#gameResult = [];
    this.#winners = [];
  }

  setCarNames(carNameList) {
    this.validateNames(carNameList);
    this.#carList = carNameList.map(carName => new Car(carName));
  }

  validateNames = carNameList => {
    if (!isInRange(carNameList)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    if (!isUnique(carNameList)) throw new Error(ERROR_MESSAGES.DUPLICATED_NAME);
    if (getDataType(carNameList) !== 'Array') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  };

  generateCars(carNameList) {
    // this.#carList = carNameList.map();
    console.log(carNameList);
  }

  get names() {
    return this.#names;
  }

  set names(name) {
    this.#names = name;
  }

  get trialCount() {
    return this.#trialCount;
  }

  set trialCount(name) {
    this.#trialCount = name;
  }

  get gameResult() {
    return this.#gameResult;
  }

  set gameResult(name) {
    this.#gameResult = name;
  }

  get winners() {
    return this.#winners;
  }

  set winners(name) {
    this.#winners = name;
  }
}

const cars = new Cars();

export default cars;
