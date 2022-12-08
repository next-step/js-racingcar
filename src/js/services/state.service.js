export class StateService {
  element;

  constructor(element) {
    this.element = document.querySelector(element);
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
