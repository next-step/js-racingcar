import { ADD_CAR_NAMES, ITERATION_COUNT } from './actions';

let state = Object.freeze({
  carNames: [],
  iterationCount: 0,
});

function setState(newState) {
  state = Object.freeze(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case(ADD_CAR_NAMES): {
      setState({
        ...state,
        carNames: payload,
      });
      break;
    }
    case(ITERATION_COUNT): {
      setState({
        ...state,
        iterationCount: payload,
      });
      break;
    }
    default: {
      setState({
        carNames: [],
        iterationCount: 0,
      });
    }
  }
}

export function getState() {
  return state;
}
