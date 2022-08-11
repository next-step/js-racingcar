import AttemptInput from './Input.js';
import BaseController from '../BaseController.js';
import Racing from '../Racing.js';

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

  // VIEW
  #visible() {
    this.$form.classList.remove('d-none');
  }

  // VIEW
  #invisible() {
    this.$form.classList.add('d-none');
  }

  // VIEW
  #able() {
    this.$filedset.disabled = false;
  }

  // VIEW
  #disalbe() {
    this.$filedset.disabled = true;
  }

  // VIEW
  #setVisible() {
    if (this.model.getHasCarPlayerName()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  // VIEW
  #setAble() {
    if (this.model.getHasAttempt()) {
      this.#disalbe();
    } else {
      this.#able();
    }
  }

  // VIEW
  render() {
    this.#setVisible();
    this.#setAble();
  }
}
