import RacingCar from '../model/RacingCar.js';
import printSpinner from '../ui/printSpinner.js';
import getRandomNumber from '../model/getRandomNumber.js';
import { game } from '../constants.js';
import renderCarStatus from '../ui/renderCarStatus.js';
import hideSpinner from '../ui/hideSpinner.js';
import { sortObjectByValue } from '../utils/index.js';

const getWinnersName = (moveForwardCountArray) => {
  const MOVE_FORWARD_CAR_NAME_INDEX = 0;
  const MOVE_FORWARD_COUNT_INDEX = 1;

  const firstWinner = moveForwardCountArray[0][MOVE_FORWARD_CAR_NAME_INDEX];
  const winners = [firstWinner];

  for (let i = 0; i < moveForwardCountArray.length - 1; i++) {
    const currentWinner = moveForwardCountArray[i];
    const nextWinner = moveForwardCountArray[i + 1];

    if (
      currentWinner[MOVE_FORWARD_COUNT_INDEX] > nextWinner[MOVE_FORWARD_COUNT_INDEX]
    )
      break;

    winners.push(nextWinner[MOVE_FORWARD_CAR_NAME_INDEX]);
  }

  return winners;
};

export const getMoveForwardCount = (arr) => {
  if (!Array.isArray(arr)) return;

  return arr.reduce((acc, cur) => {
    return cur >= game.THRESHOLD_SCORE ? acc + 1 : acc;
  }, 0);
};

export const getWinners = (carName, record) => {
  const moveForwardCount = {};

  for (let i = 0; i < carName.length; i++) {
    moveForwardCount[carName[i]] = getMoveForwardCount(record[carName[i]]);
  }

  const sortedMoveForwardCount = sortObjectByValue(moveForwardCount, 'desc');

  return getWinnersName(sortedMoveForwardCount);
};

export const move = (carName) => {
  const record = {};

  carName.forEach((name) => {
    const randomNumber = getRandomNumber(game.MIN_SCORE, game.MAX_SCORE);
    record[name] = randomNumber;
  });

  renderCarStatus(record);

  return record;
};

export default async function startGame() {
  const { count: attemptsCount, cars, record: racingCarRecord } = RacingCar;

  return new Promise((resolve) => {
    let count = 0;

    printSpinner();

    const timer = setInterval(() => {
      const record = move(cars);

      cars.forEach((ele) => {
        racingCarRecord[ele] = !racingCarRecord[ele]
          ? [record[ele]]
          : [...racingCarRecord[ele], record[ele]];
      });

      ++count;

      if (count === Number(attemptsCount)) {
        clearInterval(timer);
        hideSpinner();
        resolve();
      }
    }, 1000);
  });
}
