import BaseView from '../BaseView.js';

export default class CarPlayerNameForm extends BaseView {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-car-player-name');
    this.$filedset = this.$form.querySelector('fieldset');
  }

  #able() {
    this.$filedset.disabled = false;
  }

  #disable() {
    this.$filedset.disabled = true;
  }

  render() {
    if (this.model.getHasCarPlayerName()) {
      this.#disable();
    } else {
      this.#able();
    }
  }
}
