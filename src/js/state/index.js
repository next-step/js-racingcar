export const createStore = (initialState) => {
  let state = {
    ...initialState,
  };

  const actionMap = Object.fromEntries(
    Object.keys(initialState).map((key) => [key, []])
  );

  const getState = (key) => (key ? state[key] : state);

  const setState = (newState) => {
    Object.entries(newState).forEach(([key, value]) => {
      state = {
        ...state,
        [key]: value,
      };
      actionMap[key].forEach((action) => action(getState(key)));
    });
  };

  const subscribe = ({ key, actions }) => {
    if (actions.length === 0) throw new Error('actions 를 정의하세요.');
    if (!actionMap[key])
      throw new Error('initState 에 정의된 키를 확인하세요.');

    const registeredActions = actionMap[key];
    actionMap[key] = [...registeredActions, ...actions];
  };

  return {
    getState,
    setState,
    subscribe,
  };
};
