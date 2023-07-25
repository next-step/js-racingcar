import NumberMaker from '../NumberMaker.js';
import {
  AVALIABLE_RANDOM_NUMBER,
  CAR_STATUS_SYMBOLS,
  EXIT_COUNT,
} from '../constants/index.js';

export const isExitRace = (racingCount) => racingCount === EXIT_COUNT;

export const isMove = (randomNumber) => randomNumber >= AVALIABLE_RANDOM_NUMBER;

export const moveRacingCar = (racingCarRacers, racingCarStatus) => {
  const copyRacingCarStatus = { ...racingCarStatus };
  const randomNumbers = NumberMaker.genRacingCarRandomNumbers(racingCarRacers);
  racingCarRacers.forEach((car, i) => {
    if (isMove(randomNumbers[i]))
      copyRacingCarStatus[car] += CAR_STATUS_SYMBOLS.MOVE;
  });
  return copyRacingCarStatus;
};

export const parseRacingResultStatus = (racingCarStatus) =>
  Object.entries({ ...racingCarStatus })
    .map((racerInfo) => racerInfo.join(' : '))
    .join('\n');
