export class StateService {
  element;

  constructor(element) {
    this.element = document.querySelector(element);
  }

  setEventListener(events = []) {
    if (!events.length) {
      return;
    }

    events.forEach(e => {
      const target = document.querySelector(e.target);

      target.addEventListener(e.event, e.handler);
    });
  }

  noValue() {
    return !this.element.value;
  }

  getValue() {
    return this.element.value;
  }

  disable(element) {
    const el = element ? document.querySelector(element) : this.element;
    el.disabled = true;
  }
}
