import racingCarGameModel from '../model/RacingCarGameModel.js';
import { RACING_CAR } from '../constants/racingCar.js';
import { generateRandomNumber } from '../utils/index.js';
import { hideLoadingSpinner, showLoadingSpinner, renderCarStatus, resetRacingCarView } from '../view/racingCar.js';
import { isMoveForwardNumber } from '../utils/validator.js';

export const getMoveForwardCount = (arr) => {
  if (!Array.isArray(arr)) return;

  return arr.reduce((acc, cur) => {
    return cur >= RACING_CAR.STANDARD_MOVE_FORWARD_NUMBER ? acc + 1 : acc;
  }, 0);
};

export const getRecord = (cars) => {
  const record = {};

  cars.forEach((car) => {
    record[car.name] = car.moveForwardCount;
  });

  return record;
};

export const getWinners = (record) => {
  const winningCount = Math.max(...Object.values(record));

  return Object.keys(record).filter((key) => record[key] === winningCount);
};

export const isMoveForward = () => {
  const randomValue = generateRandomNumber(RACING_CAR.MIN_MOVE_FORWARD_NUMBER, RACING_CAR.MAX_MOVE_FORWARD_NUMBER);

  return isMoveForwardNumber(randomValue);
};

export const gameStart = () => {
  return new Promise((resolve) => {
    let count = 0;

    showLoadingSpinner();
    const timer = setInterval(() => {
      const tempMoveForwardCount = {};

      racingCarGameModel.cars.forEach((car) => {
        if (isMoveForward()) {
          // eslint-disable-next-line no-param-reassign
          ++car.moveForwardCount;
          tempMoveForwardCount[car.name] = 1;
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

const resetRacingCarGameModel = () => {
  racingCarGameModel.cars = [];
  racingCarGameModel.attemptsCount = RACING_CAR.MIN_ATTEMPTS_COUNT;
  racingCarGameModel.record = {};
  racingCarGameModel.winners = [];
};

export const restart = () => {
  resetRacingCarGameModel();
  resetRacingCarView();
};
