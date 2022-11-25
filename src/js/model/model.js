let state = {
  names: [],
};

export const setState = newState => {
  state = newState;
  console.log(state);
};

export const getState = () => state;
