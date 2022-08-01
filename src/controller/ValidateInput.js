export default class ValidateInput {
  constructor($input) {
    this.$input = $input;

    this.$input.addEventListener('input', event => {
      event.target.reportValidity();
    });
    this.#addValidate();
  }

  /**
   * @param {object} event HTMLElement: input event
   */
  validate() {}

  setCustomValidity(message) {
    this.$input.setCustomValidity(message);
  }

  #addValidate() {
    this.$input.addEventListener('input', event => {
      this.validate(event);
      event.target.reportValidity();
    });
  }
}
