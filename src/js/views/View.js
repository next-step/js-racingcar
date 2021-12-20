import { ERROR_MESSAGES } from '../constants/index.js';

export default class View extends HTMLElement {
  tag = "[View]";
  $elem;
  hiddenClassName = "hide";

  connectedCallback() {
    this.replaceChildren();
    this.insertAdjacentHTML("afterbegin", this.render());

    this.init();
  }

  init() {
    return this;
  }

  on(event, handler) {
    this.addEventListener(event, handler);
    return this;
  }

  emit(event, data) {
    const newCustomEvent = new CustomEvent(event, {
      detail: data
    });
    this.dispatchEvent(newCustomEvent);
    return this;
  }

  error(type) {
    window.alert(ERROR_MESSAGES[type]);
    return this;
  }

  render() {
    return '';
  }

  show() {
    this.classList.remove(this.hiddenClassName);
    return this;
  }

  hide() {
    this.classList.add(this.hiddenClassName);
    return this;
  }
}
