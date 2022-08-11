import BaseController from '../BaseController.js';
import CarPlayerNameInput from './NameInput.js';

export default class CarPlayerNameForm extends BaseController {
  constructor(app) {
    super(app);

    this.$form = document.querySelector('#form-car-player-name');
    this.carPlayerNameInput = new CarPlayerNameInput();

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
}
