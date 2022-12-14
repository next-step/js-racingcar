let state = Object.freeze({
  carStates: [],
  raceState: 'wait',
  raceCount: 0,
});

const subscribers = [];

function setState(newState) {
  state = Object.freeze(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case('ready'): {
      const carStates = payload.map((carName) => {
        return {
          name: carName,
          distance: 0,
        };
      });
      const raceState = 'doing';

      setState({
        ...state,
        carStates,
        raceState,
      });
      break;
    }
    case('progress'): {
      const carStates = payload;
      const raceCount = state.raceCount + 1;

      setState({
        ...state,
        carStates,
        raceCount,
      });
      break;
    }
    case('done'): {
      const raceState = 'done';

      setState({
        ...state,
        raceState,
      });
      break;
    }
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
