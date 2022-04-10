import store from './store/store.js';
import { setCarsName, setRacingNumber } from './store/creator.js';

const actionMap = {
  SET_CARS_NAME: (cars) => {
    store.dispatch(setCarsName(cars));
  },
  SET_RACING_NUMBER: (number) => {
    store.dispatch(setRacingNumber(number));
  },
};

export default actionMap;
