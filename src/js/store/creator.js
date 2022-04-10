import CreateAction from './createAction.js';
import { SET_CARS_NAME, SET_RACING_NUMBER } from './actions.js';

const setCarsName = (cars) => CreateAction(SET_CARS_NAME, { cars });
const setRacingNumber = (racingNumber) =>
  CreateAction(SET_RACING_NUMBER, { racingNumber });

export { setCarsName, setRacingNumber };
