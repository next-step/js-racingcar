import { connectStore } from './index.js';
export default class ViewStore {
    #prevState = {};
    #view;
    constructor(view) {
        this.#view = view;
        connectStore().register(this);
    }
    update(state) {
        const newState = this.#view.watch(state);
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