import { CONDITION } from '../constants/condition.js';

import gameSetting from '../model/GameSetting.js';

import { generateRandomNumber } from '../utils/index.js';

const isMovable = (randomNumber) => randomNumber >= CONDITION.MOVABLE_MIN_NUMBER;

const getResultOfOneTurn = (carNames) => {
  return new Array(carNames.length).fill(false).map(() => {
    const randomNumber = generateRandomNumber(
      CONDITION.MIN_RANDOM_NUMBER,
      CONDITION.MAX_RANDOM_NUMBER,
    );
    return isMovable(randomNumber);
  });
};

const getTotalResult = ({ carNames, trialCount }) => {
  const totalResult = {};

  carNames.forEach((name) => {
    totalResult[name] = CONDITION.INIT_DISTANCE_STATE;
  });

  for (let i = 0; i < trialCount; i++) {
    getResultOfOneTurn(carNames).forEach((result, idx) => {
      const name = carNames[idx];
      if (result === true) {
        totalResult[name] += CONDITION.UNIT_OF_DISTANCE;
      }
    });
  }

  return totalResult;
};

export const startGame = () => {
  const carNames = gameSetting.getNames();
  const trialCount = gameSetting.getTrialCount();

  const totalResult = getTotalResult({ carNames, trialCount });
};
