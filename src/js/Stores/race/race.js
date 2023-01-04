import { DONE, PROGRESS, READY, RESET } from './actions.js';
import { RACE_STATES } from './constants.js';
import { RaceStore } from './models/RaceStore.js';

let state = new RaceStore({});

const subscribers = [];

function setState(newState, action) {
  if (!RaceStore.validateProps(newState)) {
    throw new Error(`Error on action of ${action} with new State : ${newState}`);
  }

  state = new RaceStore(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case(READY): {
      const carStates = payload.map((name) => ({ name, distance: 0 }));
      const raceState = RACE_STATES.DOING;

      setState({
        ...state,
        carStates,
        raceState,
      }, action);
      break;
    }
    case(PROGRESS): {
      const carStates = payload;
      const raceCount = state.raceCount + 1;

      setState({
        ...state,
        carStates,
        raceCount,
      }, action);
      break;
    }
    case(DONE): {
      const raceState = RACE_STATES.DONE;

      setState({
        ...state,
        raceState,
      }, action);
      break;
    }
    case(RESET):
    default: {
      setState({
        carStates: [],
        isRaceDone: false,
        raceCount: 0,
      }, action);
    }
  }

  noticeToSubscribers(state);
}

function noticeToSubscribers(state) {
  subscribers.forEach((subscriber) => subscriber(state));
}

export function getState() {
  return state;
}

export function subscribe(subscriber) {
  subscribers.push(subscriber);
}
