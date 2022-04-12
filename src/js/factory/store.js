import { ERROR_MESSAGE } from '../constants.js';

const initState = {
  winner: '',
  maxMoveCount: 0,
};

const useStore = () => {
  const localState = { ...initState };

  const setState = (key, value) => {
    if (localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    localState[key] = value;
  };

  const getState = key => {
    if (key === undefined) return localState;
    if (localState[key] === undefined) throw new ReferenceError(ERROR_MESSAGE.NOT_EXISTS_KEY);

    return localState[key];
  };

  return {
    setState,
    getState,
  };
};

export default useStore;
