import { ADD_CAR_NAMES, ITERATION_COUNT, RESET } from './actions.js';
import { GlobalStore } from '../../Models/GlobalStore.js';

let state = new GlobalStore();

function setState(newState) {
  state = new GlobalStore(newState);
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
    case(RESET):
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
