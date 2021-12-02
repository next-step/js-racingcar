import { Status, StateKeys } from '../types.js';
import worker from './worker.js';
export const initialState = {
    [StateKeys.cars]: [],
    [StateKeys.totalAttempts]: 0,
    [StateKeys.trial]: 0,
    [StateKeys.scores]: [],
    [StateKeys.processing]: false,
    [StateKeys.winners]: [],
    [StateKeys.status]: Status.idle,
};
export default class Store {
    #subscribers = new Set();
    #state;
    constructor(app, initialState) {
        this.#state = initialState;
        app.addEventListener('dispatch', ({ detail: { actionType, data } }) => {
            this.dispatch(actionType, data);
        });
    }
    dispatch(actionType, data = {}) {
        window.requestAnimationFrame(() => {
            console.info(`%c[[%c${actionType}%c]]`, 'color: #ee8', 'color: #8ee', 'color: #ee8', data);
            worker(actionType)(this, data);
        });
    }
    register(viewStore) {
        this.#subscribers.add(viewStore);
    }
    deregister(viewStore) {
        this.#subscribers.delete(viewStore);
    }
    publish() {
        window.requestAnimationFrame(() => {
            this.#subscribers.forEach((subscriber) => {
                subscriber.update(this.#state);
            });
        });
    }
    setValue(state) {
        window.requestAnimationFrame(() => {
            this.#state = { ...this.#state, ...state };
            this.publish();
        });
    }
    get(prop) {
        return this.#state[prop];
    }
}
export const connectStore = (() => {
    let closureStore;
    return (elem, state) => {
        if (elem && state)
            closureStore = new Store(elem, state);
        return closureStore;
    };
})();
//# sourceMappingURL=index.js.map