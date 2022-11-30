import racingCarModel from '../model/RacingCarModel.js';
import { RACING_CAR } from '../constants/racingCar.js';
import { generateRandomNumber, sortObjectByValue } from '../utils/index.js';
import { hideLoadingSpinner, showLoadingSpinner, renderCarStatus } from '../view/racingCar.js';

export const getMoveForwardCount = (arr) => {
  if (!Array.isArray(arr)) return;

  return arr.reduce((acc, cur) => {
    return cur >= RACING_CAR.STANDARD_MOVE_FORWARD_NUMBER ? acc + 1 : acc;
  }, 0);
};

const getWinnersName = (moveForwardCountArray) => {
  const MOVE_FORWARD_CAR_NAME_INDEX = 0;
  const MOVE_FORWARD_COUNT_INDEX = 1;

  const firstWinner = moveForwardCountArray[0][MOVE_FORWARD_CAR_NAME_INDEX];
  const winners = [firstWinner];

  for (let i = 0; i < moveForwardCountArray.length - 1; i++) {
    const currentWinner = moveForwardCountArray[i];
    const nextWinner = moveForwardCountArray[i + 1];

    if (currentWinner[MOVE_FORWARD_COUNT_INDEX] > nextWinner[MOVE_FORWARD_COUNT_INDEX]) break;

    winners.push(nextWinner[MOVE_FORWARD_CAR_NAME_INDEX]);
  }

  return winners;
};

export const getWinners = (carName, record) => {
  const moveForwardCount = {};

  for (let i = 0; i < carName.length; i++) {
    moveForwardCount[carName[i]] = getMoveForwardCount(record[carName[i]]);
  }

  const sortedMoveForwardCount = sortObjectByValue(moveForwardCount, 'desc');

  return getWinnersName(sortedMoveForwardCount);
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
  return new Promise((resolve) => {
    let count = 0;

    showLoadingSpinner();
    const timer = setInterval(() => {
      const record = moveOrStop(racingCarModel.name);

      racingCarModel.name.forEach((elem) => {
        racingCarModel.record[elem] = !racingCarModel.record[elem]
          ? [record[elem]]
          : [...racingCarModel.record[elem], record[elem]];
      });

      ++count;

      if (count === racingCarModel.attemptsCount) {
        clearInterval(timer);
        hideLoadingSpinner();
        resolve();
      }
    }, RACING_CAR.MOVE_FORWARD_WAITING_TIME);
  });
};
