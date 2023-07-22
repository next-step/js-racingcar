import NumberMaker from '../NumberMaker.js';
import { AVALIABLE_RANDOM_NUMBER, CAR_SYMBOLS, EXIT_COUNT } from '../constants/index.js';

export const isExitRace = (racingCount) => racingCount === EXIT_COUNT;
export const isMove = (randomNumber) => randomNumber >= AVALIABLE_RANDOM_NUMBER;
export const moveRacingCar = (racingCarNames, racingCarStatus) => {
  const copyRacingCarStatus = { ...racingCarStatus };
  const randomNumbers = NumberMaker.genRacingCarNumbers(racingCarNames);
  racingCarNames.forEach(
    (car, i) => isMove(randomNumbers[i]) && (copyRacingCarStatus[car] += CAR_SYMBOLS.MOVE)
  );
  return copyRacingCarStatus;
};
export const parseRacingResultStatus = (racingCarStatus) => {
  return Object.entries({ ...racingCarStatus })
    .map((racingCarStatus) => racingCarStatus.join(' : '))
    .join('\n');
};
