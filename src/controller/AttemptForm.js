import AttemptInput from './AttemptInput.js';
import BaseController from './BaseController.js';

export default class AttemptForm extends BaseController {
  constructor(state) {
    super(state);

    this.$form = document.querySelector('#form-attempt');
    this.attemptInput = new AttemptInput();
    this.$filedset = this.$form.querySelector('fieldset');
    this.#addSubmitEvent();
  }

  #addSubmitEvent() {
    this.$form.addEventListener('submit', this.#setAttempt.bind(this));
  }

  #setAttempt(event) {
    event.preventDefault();
    const { value } = this.attemptInput.$input;

    this.setState('attempt', value);
  }

  // TODO: STORE 쓰면 불리
  #hasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  // TODO: STORE 쓰면 불리
  #hasAttempt() {
    return !!this.state.attempt;
  }

  #visible() {
    this.$form.classList.remove('d-none');
  }

  #invisible() {
    this.$form.classList.add('d-none');
  }

  #able() {
    this.$filedset.disabled = false;
  }

  #disalbe() {
    this.$filedset.disabled = true;
  }

  #setVisible() {
    if (this.#hasCarPlayerName()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  #setAble() {
    if (this.#hasAttempt()) {
      this.#disalbe();
    } else {
      this.#able();
    }
  }

  render() {
    this.#setVisible();
    this.#setAble();
  }
}
