import { SET_CARS_NAME, SET_RACING_NUMBER } from './actions.js';

const initialState = {
  cars: [],
  racingNumber: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CARS_NAME:
      return {
        ...state,
        cars: payload.cars,
      };

    case SET_RACING_NUMBER:
      return {
        ...state,
        racingNumber: payload.racingNumber,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
