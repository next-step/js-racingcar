import BaseView from './View.js';

export default class BaseInput extends BaseView {
  constructor(app, $input) {
    super(app);
    this.$input = $input;

    this.#addValidity();
  }

  /**
   * @param {object} event HTMLElement: input event
   *
   */
  setValidity() {}

  setCustomValidity(message) {
    this.$input.setCustomValidity(message);
  }

  #addValidity() {
    this.$input.addEventListener('input', event => {
      this.setValidity(event);
      event.target.reportValidity();
    });
  }

  static clear($input) {
    $input.value = '';
  }
}
