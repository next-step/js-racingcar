import { getRandomNumber } from '../service/racingCar.js';
import {
  TRIM_BETWEEN_COMMA,
  GENERATION_MIN,
  GENERATION_MAX,
  GO_OR_STOP_STANDARD,
} from '../utils/constants.js';

const state = {
  names: [],
  trialCount: 0,
  gameResult: [],
};

export const getState = () => state;
export const setName = newName => {
  state.names = newName;
};
export const setTrialCount = newTrialCount => {
  state.trialCount = newTrialCount;
};

export const setGameResult = newGameResult => {
  state.gameResult = newGameResult;
};

export const trimNames = value => value.replace(TRIM_BETWEEN_COMMA, ',').trim();
export const splitName = name => name.split(',');

const isGoOrStop = randomNum => randomNum > GO_OR_STOP_STANDARD;

const getGameResult = () => {
  const { trialCount } = getState();
  return new Array(trialCount).fill(false).map(element => {
    const randomNum = getRandomNumber(GENERATION_MIN, GENERATION_MAX);
    return isGoOrStop(randomNum);
  });
};

export const generateGame = () => {
  const { names } = getState();
  return names.reduce((acc, name) => ({ ...acc, [name]: getGameResult() }), {});
};
