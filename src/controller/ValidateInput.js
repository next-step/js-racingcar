export default class ValidateInput {
  constructor($input) {
    this.$input = $input;

    this.#addValidate();
  }

  /**
   * @param {object} event HTMLElement: input event
   *
   * validate을 반듯이 구현해합니다.
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
