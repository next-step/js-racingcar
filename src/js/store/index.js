import observer from '../core/observer.js';

export const store = {
  state: observer.observable({
    a: 10,
    b: 20,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (this.state[key] && value !== this.state[key]) this.state[key] = value;
      if (this.state[key] === undefined)
        throw new Error('올바르지 않은 상태 값 입니다.');
    }
  },
};
