export default class Connect {
    #watch;
    #prevState = {};
    #view;
    constructor(view, watch) {
        this.#view = view;
        this.#watch = watch;
    }
    update(state) {
        const newState = this.#watch(state);
        const updatedKeys = new Set();
        const updatedState = Object.keys(newState).reduce((p, k) => {
            if (newState[k] !== this.#prevState[k]) {
                updatedKeys.add(k);
                p[k] = newState[k];
            }
            return p;
        }, {});
        if (updatedKeys.size) {
            this.#prevState = state;
            this.#view.onStoreUpdated(updatedState, state);
        }
    }
}
//# sourceMappingURL=connect.js.map