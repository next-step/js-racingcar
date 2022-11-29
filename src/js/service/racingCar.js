import model from '../model/Model.js';
import { RACING_CAR } from '../constants/racingCar.js';
import { generateRandomNumber } from '../utils/index.js';
import { hideLoadingSpinner, showLoadingSpinner, renderCarStatus } from '../view/racingCar.js';

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

export const gameStart = () => {
  let count = 0;

  showLoadingSpinner();
  const timer = setInterval(() => {
    hideLoadingSpinner();
    const record = moveOrStop(model.carName);

    model.carName.forEach((elem) => {
      model.record[elem] = !model.record[elem] ? [record[elem]] : [...model.record[elem], record[elem]];
    });

    ++count;

    if (count === model.carAttemptsCount) clearInterval(timer);

    if (count < model.carAttemptsCount) showLoadingSpinner();
  }, RACING_CAR.MOVE_FORWARD_WAITING_TIME);
};
