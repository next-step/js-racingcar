import createAction from '../core/Redux/createAction.js';
import { determineCarMove, determineWinner } from '../util/carUtil.js';

export const SET_CARS_NAME = 'SET_CARS_NAME';
export const SET_PLAY_TIMES = 'SET_PLAY_TIMES';
export const PLAY_ONE_ROUND = 'PLAY_ONE_ROUND';
export const RESET_CAR_STATE = 'RESET_CAR_STATE';
export const BEFORE_PLAY_LOADING = 'BEFORE_PLAY_LOADING';
export const CHOOSE_WINNER = 'CHOOSE_WINNER';

export const actions = {
  SET_CARS_NAME: (cars) => createAction(SET_CARS_NAME, { cars }),
  SET_PLAY_TIMES: (times) => createAction(SET_PLAY_TIMES, { times }),
  BEFORE_PLAY_LOADING: () => createAction(BEFORE_PLAY_LOADING),
  PLAY_ONE_ROUND: (cars) =>
    createAction(PLAY_ONE_ROUND, { carStates: determineCarMove(cars) }),
  RESET_CAR_STATE: () => createAction(RESET_CAR_STATE),
  CHOOSE_WINNER: (cars) =>
    createAction(CHOOSE_WINNER, { winner: determineWinner(cars) }),
};
