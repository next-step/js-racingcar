import { connectStore } from './index.js';
export default class ViewStore {
    #watch;
    #prevState = {};
    #view;
    constructor(view, watch) {
        this.#view = view;
        this.#watch = watch;
        connectStore().register(this);
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
    deregister() {
        connectStore().deregister(this);
    }
}
//# sourceMappingURL=viewStore.js.map