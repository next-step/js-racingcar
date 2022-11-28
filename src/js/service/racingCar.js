import model from '../model/Model.js';
import { RACING_CAR } from '../constants/racingCar.js';
import { generateRandomNumber } from '../utils/index.js';
import { getCarAttemptsCount, hideLoadingStatus, renderCarStatus, showLoadingStatus } from '../view/racingCar.js';

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

export const gameStart = async () => {
  const carAttemptsCount = getCarAttemptsCount();

  for (let i = 0; i < carAttemptsCount; i++) {
    showLoadingStatus();

    // eslint-disable-next-line no-await-in-loop
    await wait(RACING_CAR.MOVE_FORWARD_WAITING_TIME);
    hideLoadingStatus();
    const record = moveOrStop(model.carName);

    model.carName.forEach((elem) => {
      model.record[elem] = !model.record[elem] ? [record[elem]] : [...model.record[elem], record[elem]];
    });
  }
};
