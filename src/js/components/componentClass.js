export default class Component{
    constructor(component, store, state, innerHTML) {
        this.component = component;
        this.store = store;
        this.state = state;
        this.innerHTML = innerHTML;
        this.init();
    }
    init() {

    }

    display(flag) {
        this.component.style.display = flag === true ? "" : "none";
    }

    eventHandler() {

    }

    render(innerHTML) {
        this.component.innerHTML = innerHTML || this.innerHTML;
    }
}