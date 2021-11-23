import reducer from './reducer.js';
export var StateKeys;
(function (StateKeys) {
    StateKeys["cars"] = "cars";
    StateKeys["totalAttempts"] = "totalAttempts";
    StateKeys["trial"] = "trial";
    StateKeys["scores"] = "scores";
    StateKeys["processing"] = "processing";
    StateKeys["winners"] = "winners";
    StateKeys["status"] = "status";
})(StateKeys || (StateKeys = {}));
export const initialState = {
    [StateKeys.cars]: [],
    [StateKeys.totalAttempts]: 0,
    [StateKeys.trial]: 0,
    [StateKeys.scores]: [],
    [StateKeys.processing]: false,
    [StateKeys.winners]: [],
    [StateKeys.status]: 'idle',
};
export default class Store {
    #observers = new Set();
    #state;
    constructor(app, initialState) {
        this.#state = initialState;
        app.addEventListener('dispatch', ({ detail: { actionType, data } }) => {
            this.dispatch(actionType, data);
        });
    }
    dispatch(actionType, data = {}) {
        window.requestAnimationFrame(() => {
            console.info(`%c[ %c${actionType}%c ] %cpayload:`, 'color: #ff5', 'color: #f77', 'color: #ff5', 'color: #7ff', data, this.#state);
            reducer(actionType)(this, data);
        });
    }
    observe(viewStore) {
        this.#observers.add(viewStore);
    }
    unobserve(viewStore) {
        this.#observers.delete(viewStore);
    }
    notify() {
        window.requestAnimationFrame(() => {
            this.#observers.forEach((listener) => {
                listener.update(this.#state);
            });
        });
    }
    setValue(state) {
        window.requestAnimationFrame(() => {
            this.#state = { ...this.#state, ...state };
            this.notify();
        });
    }
    get(prop) {
        return this.#state[prop];
    }
}
export const getStore = (() => {
    let closuredStore;
    return (elem, state) => {
        if (elem && state)
            closuredStore = new Store(elem, state);
        return closuredStore;
    };
})();
//# sourceMappingURL=index.js.map