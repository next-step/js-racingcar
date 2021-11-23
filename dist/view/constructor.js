import { connectStore } from '../store/index.js';
import ViewStore from '../store/viewStore.js';
import errorHandler from '../util/errorHandler.js';
const eventErrorCatcher = (handler) => (e) => {
    try {
        handler(e);
    }
    catch (err) {
        errorHandler('view', err);
    }
};
export default class View extends HTMLElement {
    events = new Map();
    viewStore;
    onStoreUpdated(updatedState, totalState) { }
    observe() {
        if (this.watch) {
            this.viewStore = new ViewStore(this, this.watch);
            connectStore().observe(this.viewStore);
        }
    }
    on(eventType, handler) {
        let cb = this.events.get(handler);
        if (!cb) {
            cb = eventErrorCatcher(handler);
            this.events.set(handler, cb);
        }
        this.addEventListener(eventType, cb);
        return this;
    }
    off(eventType, handler) {
        const cb = this.events.get(handler);
        this.removeEventListener(eventType, cb);
        return this;
    }
    dispatch(actionType, data = {}) {
        const event = new CustomEvent('dispatch', { detail: { actionType, data }, bubbles: true });
        this.dispatchEvent(event);
        return this;
    }
    hide() {
        this.style.display = 'none';
        return this;
    }
    show() {
        this.style.display = '';
        return this;
    }
    connectedCallback() {
        this.observe();
    }
    disconnectedCallback() {
        if (this.watch) {
            connectStore().unobserve(this.viewStore);
        }
    }
}
//# sourceMappingURL=constructor.js.map