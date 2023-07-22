import { AVALIABLE_RANDOM_NUMBER, EXIT_COUNT } from '../constants/index.js';

export const isExitRace = (racingCount) => racingCount === EXIT_COUNT;
export const isMove = (randomNumber) => randomNumber >= AVALIABLE_RANDOM_NUMBER;
