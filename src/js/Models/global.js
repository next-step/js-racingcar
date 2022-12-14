let state = Object.freeze({
  carNames: [],
  iterationCount: 0,
});

function setState(newState) {
  state = Object.freeze(newState);
}

export function dispatch(action, payload) {
  switch(action) {
    case('addCarNames'): {
      setState({
        ...state,
        carNames: payload,
      });
      break;
    }
    case('iterationCount'): {
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
