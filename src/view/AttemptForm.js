import BaseView from './BaseView.js';

export default class AttemptForm extends BaseView {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-attempt');
    this.$filedset = this.$form.querySelector('fieldset');
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

  render() {
    this.#setVisible();
    this.#setAble();
  }
}
