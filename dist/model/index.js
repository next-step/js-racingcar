import Actions from './action.js';
export var StateKeys;
(function (StateKeys) {
    StateKeys["cars"] = "cars";
    StateKeys["totalAttempts"] = "totalAttempts";
    StateKeys["trial"] = "trial";
    StateKeys["status"] = "status";
    StateKeys["pending"] = "pending";
})(StateKeys || (StateKeys = {}));
export const initialState = {
    [StateKeys.cars]: [],
    [StateKeys.totalAttempts]: 0,
    [StateKeys.trial]: 0,
    [StateKeys.status]: [],
    [StateKeys.pending]: false,
};
export default class Model {
    #observers = new Set();
    #state;
    constructor(app, initialState) {
        this.#state = initialState;
        app.addEventListener('dispatch', ({ detail: { actionType, data } }) => {
            Actions[actionType](this, data);
        });
    }
    observe(viewModel) {
        this.#observers.add(viewModel);
    }
    unobserve(viewModel) {
        this.#observers.delete(viewModel);
    }
    notify() {
        console.log(this.#observers);
        window.requestAnimationFrame(() => {
            console.log(this.#state);
            this.#observers.forEach((listener) => {
                listener.update(this.#state);
            });
        });
    }
    setValue(state) {
        this.#state = { ...this.#state, ...state };
        this.notify();
    }
    get(prop) {
        return this.#state[prop];
    }
}
export const getModel = (() => {
    let closuredModel;
    return (elem, state) => {
        if (elem && state)
            closuredModel = new Model(elem, state);
        return closuredModel;
    };
})();
//# sourceMappingURL=index.js.map