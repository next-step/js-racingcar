import AttemptInput from './Input.js';
import BaseController from '../BaseController.js';
import Racing from '../Racing.js';

export default class AttemptForm extends BaseController {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-attempt');
    this.attemptInput = new AttemptInput();
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
}
