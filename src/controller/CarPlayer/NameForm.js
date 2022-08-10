import BaseController from '../BaseController.js';
import CarPlayerNameInput from './NameInput.js';

export default class CarPlayerNameForm extends BaseController {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-car-player-name');
    this.carPlayerNameInput = new CarPlayerNameInput();
    this.$filedset = this.$form.querySelector('fieldset');

    this.#addSubmitEvent();
  }

  #setCarPlayerNames(event) {
    event.preventDefault();
    const value = this.carPlayerNameInput.$input.value.split(',').map(name => name.trim());

    this.setState('carPlayerNames', value);
  }

  #addSubmitEvent() {
    this.$form.addEventListener('submit', this.#setCarPlayerNames.bind(this));
  }

  // VIEW
  #getHasCarPlayerName() {
    return this.app.state.carPlayerNames.length > 0;
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
  render() {
    if (this.#getHasCarPlayerName()) {
      this.#disalbe();
    } else {
      this.#able();
    }
  }
}
