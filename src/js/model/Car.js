import { NAME_LENGTH_MIN, NAME_LENGTH_MAX } from '../constant/racingcar.js';
import { getDataType } from '../utils/dataType.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';

const isInRange = name => name.length >= NAME_LENGTH_MIN && name.length <= NAME_LENGTH_MAX;

export const validateName = carName => {
  if (!isInRange(carName)) throw new Error(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
  if (getDataType(carName) !== 'String') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
  return true;
};

export class Car {
  name;

  distance;

  process;

  constructor(name) {
    this.name = name;
    this.distance = 0;
    this.process = [];
  }

  move() {
    this.distance += 1;
  }

  setProcess(newProcess) {
    this.process = newProcess;
  }

  initProcess(trialCount) {
    const process = new Array(trialCount).fill(false);
    this.process = process;
  }

  run(movingStrategy) {
    if (!movingStrategy.isMoveable()) return false;
    this.move();
    return true;
  }
}
