export class FormControlService {
  element;

  constructor(selector) {
    this.element = document.querySelector(selector);
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
