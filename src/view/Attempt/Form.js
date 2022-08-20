import BaseView from '../Base/View.js';

export default class ViewAttemptForm extends BaseView {
  constructor(app) {
    super(app);
    this.raceController = this.controller.race;

    this.$form = document.querySelector('#form-attempt');
    this.$attemptInput = document.querySelector('#input-attempt');
    this.$filedset = this.$form.querySelector('fieldset');

    this.#addSubmitEvent();
  }

  #addSubmitEvent() {
    this.$form.addEventListener('submit', this.#raceStart.bind(this));
  }

  #raceStart(event) {
    event.preventDefault();
    this.raceController.starRace(this);
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

  #disable() {
    this.$filedset.disabled = true;
  }

  #setVisible() {
    if (this.model.getHasCarPlayerName()) {
      this.#visible();
    } else {
      this.#invisible();
    }
  }

  #setAble() {
    if (this.model.getHasAttempt()) {
      this.#disable();
    } else {
      this.#able();
    }
  }

  setAttempt() {
    const { value } = this.$attemptInput;

    this.raceController.setAttempt(value);
  }

  render() {
    this.#setVisible();
    this.#setAble();
  }
}
