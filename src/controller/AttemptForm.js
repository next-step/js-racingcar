import AttemptInput from './AttemptInput.js';
import BaseController from './BaseController.js';
import Racing from './Racing.js';

export default class AttemptForm extends BaseController {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-attempt');
    this.attemptInput = new AttemptInput();
    this.$filedset = this.$form.querySelector('fieldset');
    this.racing = new Racing(app);

    this.#addSubmitEvent();
  }

  #addSubmitEvent() {
    this.$form.addEventListener('submit', this.#starRacing.bind(this));
  }

  #starRacing(event) {
    event.preventDefault();
    this.#setAttempt();
    this.racing.startRacing();
  }

  #setAttempt() {
    const { value } = this.attemptInput.$input;

    this.setState('attempt', value);
  }

  // TODO: STORE 쓰면 불리
  #getHasCarPlayerName() {
    return this.app.state.carPlayerNames.length > 0;
  }

  // TODO: STORE 쓰면 불리
  #getHasAttempt() {
    return !!this.app.state.attempt;
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
    if (this.#getHasCarPlayerName()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  #setAble() {
    if (this.#getHasAttempt()) {
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
