import {
  BEFORE_PLAY_LOADING,
  CHOOSE_WINNER,
  PLAY_ONE_ROUND,
  RESET_CAR_STATE,
  SET_CARS_NAME,
  SET_PLAY_TIMES,
} from './actions.js';

const initialState = {
  cars: [],
  times: 0,
  winner: [],
  isPlaying: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CARS_NAME:
      return {
        ...state,
        cars: payload.cars,
      };
    case SET_PLAY_TIMES:
      return {
        ...state,
        times: payload.times,
      };
    case PLAY_ONE_ROUND:
      console.log(payload);
      return {
        ...state,
        isPlaying: true,
        cars: state.cars.map((car, carIdx) => {
          return {
            ...car,
            carStates: car.carStates.map((_, stateIdx) => {
              if (stateIdx === car.carStates.length - 1) {
                return payload.carStates[carIdx];
              }
              return _;
            }),
          };
        }),
      };
    case BEFORE_PLAY_LOADING:
      return {
        ...state,
        isPlaying: true,
        cars: state.cars.map((car) => {
          return {
            ...car,
            carStates: car.carStates.concat('loading'),
          };
        }),
      };
    case CHOOSE_WINNER:
      return {
        ...state,
        isPlaying: false,
        winner: payload.winner,
      };
    case RESET_CAR_STATE:
      return {
        ...state,
        winner: [],
        cars: state.cars.map((car) => {
          return { ...car, carStates: [] };
        }),
      };
    default:
      return state;
  }
};

export default reducer;
