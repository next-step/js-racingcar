export default class ComponentHandler extends HTMLElement {
  bindHandler(events) {
    events.forEach(({ type, callback }) => this.addEventListener(type, callback));
    return () => {
      events.forEach(({ type, callback }) => this.removeEventListener(type, callback));
    };
  }

  dispatch(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
    return this;
  }
}
