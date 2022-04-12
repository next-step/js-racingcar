export const createStore = (initialState) => {
  let state = {
    ...initialState,
  };

  const listenerMap = Object.fromEntries(
    Object.keys(initialState).map((key) => [key, []])
  );

  const getState = (key) => (key ? state[key] : state);

  const setState = (newState) => {
    state = {
      ...state,
      ...newState,
    };

    Object.keys(newState).forEach((key) =>
      listenerMap[key].forEach((listener) => listener(getState(key)))
    );
  };

  const subscribe = ({ key, listeners }) => {
    if (listeners.length === 0) throw new Error('listeners 를 정의하세요.');
    if (!listenerMap[key])
      throw new Error('initState 에 정의된 키를 확인하세요.');

    const registeredListeners = listenerMap[key];
    listenerMap[key] = [...registeredListeners, ...listeners];
  };

  return {
    getState,
    setState,
    subscribe,
  };
};
