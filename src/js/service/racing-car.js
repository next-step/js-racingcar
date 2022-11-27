import { RACING_CAR } from '../constants/racing-car.js';
import { generateRandomNumber } from '../utils/index.js';
import { renderCarStatus } from '../view/racing-car.js';

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const moveOrStop = (carName) => {
  const record = {};

  carName.forEach((name) => {
    const randomValue = generateRandomNumber(RACING_CAR.MIN_MOVE_FORWARD_NUMBER, RACING_CAR.MAX_MOVE_FORWARD_NUMBER);
    record[name] = randomValue;
  });

  renderCarStatus(record);

  return record;
};
