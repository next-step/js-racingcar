export default class BaseInput {
  constructor($input) {
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

  static Clear() {
    document.querySelectorAll('input').forEach($input => {
      $input.value = '';
    });
  }
}
