let state = {
  carDistances: [],
  raceState: 'wait',
  raceCount: 0,
};

const subscribers = [];

function setState(newState) {
  state = newState;
}

export function dispatch(action, payload) {
  switch(action) {
    case('ready'): {
      const carDistances = payload.map((carName) => {
        return {
          name: carName,
          distance: 0,
        };
      });
      const raceState = 'doing';

      setState({
        ...state,
        carDistances,
        raceState,
      });
      break;
    }
    case('progress'): {
      const carDistances = payload;
      const raceCount = state.raceCount + 1;

      setState({
        ...state,
        carDistances,
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
        carDistances: [],
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
