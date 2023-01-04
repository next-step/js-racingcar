import { DONE, PROGRESS, READY, RESET } from './actions.js';
import { RACE_STATES } from './constants.js';

let state = Object.freeze({
  carStates: [],
  raceState: RACE_STATES.WAIT,
  raceCount: 0,
});

const subscribers = [];

function setState(newState) {
  state = Object.freeze(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case(READY): {
      const carStates = payload.map((name) => {
        return {
          name,
          distance: 0,
        };
      });
      const raceState = RACE_STATES.DOING;

      setState({
        ...state,
        carStates,
        raceState,
      });
      break;
    }
    case(PROGRESS): {
      const carStates = payload;
      const raceCount = state.raceCount + 1;

      setState({
        ...state,
        carStates,
        raceCount,
      });
      break;
    }
    case(DONE): {
      const raceState = RACE_STATES.DONE;

      setState({
        ...state,
        raceState,
      });
      break;
    }
    case(RESET):
    default: {
      setState({
        carStates: [],
        isRaceDone: false,
        raceCount: 0,
      });
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
