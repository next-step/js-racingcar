import BaseController from './BaseController.js';
import CarPlayerNameInput from './CarPlayerNameInput.js';

export default class CarPlayerNameForm extends BaseController {
  constructor(state) {
    super(state);

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

  // TODO: STORE 쓰면 불리
  #getHasCarPlayerName() {
    return this.state.carPlayerNames.length > 0;
  }

  #able() {
    this.$filedset.disabled = false;
  }

  #disalbe() {
    this.$filedset.disabled = true;
  }

  render() {
    if (this.#getHasCarPlayerName()) {
      this.#disalbe();
    } else {
      this.#able();
    }
  }
}
