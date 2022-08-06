import View from './View.js';
import { $ } from '../utils.js';

export default class CarNameFormView extends View {
  constructor(element = $('#car-name-component')) {
    super(element);
    this.inputElement = $('#input-car-name');
    this.buttonElement = $('#submit-car-name');
    this.bindEvents();
  }

  bindEvents() {
    this.on('submit', (event) => this.submitCarName(event));
  }

  submitCarName(event) {
    event.preventDefault();
    const { value: carNames } = this.inputElement;
    this.emit('@submit', carNames);
  }

  #showInputValue(value) {
    this.inputElement.value = value;
  }

  #disableButton(isDisabled) {
    this.inputElement.disabled = isDisabled;
    this.buttonElement.disabled = isDisabled;
  }

  show(cars) {
    const value = cars.map((car) => car.name).join(',');
    this.#showInputValue(value);
    this.#disableButton(!!value);
  }
}
