import { DEFAULT_STORE_STATE } from '../constants/state.js';
import observer from '../core/observer.js';

export const store = {
  state: observer.observable({ ...DEFAULT_STORE_STATE }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (this.state[key] === undefined)
        throw new Error('올바르지 않은 상태 값 입니다.');

      if (value !== this.state[key]) {
        this.state[key] = value;
      }
    }
  },
};
