import racingCarGameModel from '../model/RacingCarGameModel.js';
import { RACING_CAR } from '../constants/racingCar.js';
import { generateRandomNumber } from '../utils/index.js';
import { hideLoadingSpinner, showLoadingSpinner, renderCarStatus } from '../view/racingCar.js';

export const getMoveForwardCount = (arr) => {
  if (!Array.isArray(arr)) return;

  return arr.reduce((acc, cur) => {
    return cur >= RACING_CAR.STANDARD_MOVE_FORWARD_NUMBER ? acc + 1 : acc;
  }, 0);
};

export const getWinners = (record) => {
  const winningCount = Math.max(...Object.values(record));

  const winningNames = Object.keys(record).filter((key) => record[key] === winningCount);

  return winningNames;
};

export const isMoveForward = () => {
  const randomValue = generateRandomNumber(RACING_CAR.MIN_MOVE_FORWARD_NUMBER, RACING_CAR.MAX_MOVE_FORWARD_NUMBER);

  if (randomValue >= RACING_CAR.STANDARD_MOVE_FORWARD_NUMBER) {
    return true;
  }
  return false;
};

export const gameStart = () => {
  return new Promise((resolve) => {
    let count = 0;

    showLoadingSpinner();
    const timer = setInterval(() => {
      const tempMoveForwardCount = {};

      racingCarGameModel.cars.forEach((car) => {
        // eslint-disable-next-line no-param-reassign
        if (isMoveForward()) {
          tempMoveForwardCount[car.name] = 1;
          racingCarGameModel.record[car.name] += 1;
        }
      });
      renderCarStatus(tempMoveForwardCount);

      ++count;

      if (count === racingCarGameModel.attemptsCount) {
        clearInterval(timer);
        hideLoadingSpinner();
        resolve();
      }
    }, RACING_CAR.MOVE_FORWARD_WAITING_TIME);
  });
};
