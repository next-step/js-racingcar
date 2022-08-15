import BaseView from '../Base/View.js';

export default class ViewCarPlayerNameForm extends BaseView {
  constructor(app) {
    super(app);
    this.raceController = this.controller.race;

    this.$form = document.querySelector('#form-car-player-name');
    this.$carPlayerInput = document.querySelector('#input-car-player-name');
    this.$filedset = this.$form.querySelector('fieldset');

    this.#addSubmitEvent();
  }

  #setCarPlayerNames(event) {
    event.preventDefault();
    const { value } = this.$carPlayerInput;

    this.raceController.setCarPlayerNames(value);
  }

  #addSubmitEvent() {
    this.$form.addEventListener('submit', this.#setCarPlayerNames.bind(this));
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
