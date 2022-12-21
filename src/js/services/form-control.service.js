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

  clearForm(element) {
    document.querySelector(element).reset();
  }

  disable(element) {
    const el = element ? document.querySelector(element) : this.element;
    el.disabled = true;
  }

  enable(element) {
    const el = element ? document.querySelector(element) : this.element;
    el.disabled = false;
  }
}
