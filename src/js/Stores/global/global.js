import { ADD_CAR_NAMES, ITERATION_COUNT, RESET } from './actions.js';
import { GlobalStore } from './models/GlobalStore.js';

let state = new GlobalStore();

function setState(newState, action) {
  if (!GlobalStore.validateProps(newState)) {
    throw new Error(`Error on action of ${action} with new State : ${newState}`);
  }

  state = new GlobalStore(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case(ADD_CAR_NAMES): {
      setState({
        ...state,
        carNames: payload,
      }, action);
      break;
    }
    case(ITERATION_COUNT): {
      setState({
        ...state,
        iterationCount: payload,
      }, action);
      break;
    }
    case(RESET):
    default: {
      setState({
        carNames: [],
        iterationCount: 0,
      }, action);
    }
  }
}

export function getState() {
  return state;
}
