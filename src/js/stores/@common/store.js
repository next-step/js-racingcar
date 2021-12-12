const createStore = (initialState) => ({
  state: initialState,
  effect: Object.keys(initialState).reduce((effectMap, key) => {
    return {
      ...effectMap,
      [key]: [],
    };
  }, {}),

  setState(newState) {
    Object.keys(newState).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(this.state, key)) {
        return;
      }

      if (this.state[key] === newState[key]) {
        return;
      }

      this.state[key] = newState[key];
      this.effect[key].forEach((effect) => effect(this.state));
    });
  },

  selectState(selectFunction) {
    return selectFunction(this.state);
  },

  subscribeState(stateKey, effect) {
    if (typeof effect !== "function") {
      throw Error("store의 state 구독시 effect는 함수만 허용됩니다.");
    }

    const _subscribeState = (stateKey, effect) => {
      if (!(stateKey in this.state)) {
        throw Error(`존재하지 않는 state입니다. (stateKey: ${stateKey})`);
      }

      this.effect[stateKey].push(effect);
    };

    if (Array.isArray(stateKey)) {
      stateKey.forEach((key) => _subscribeState(key, effect));
    } else {
      _subscribeState(stateKey, effect);
    }
  },
});

export { createStore };
