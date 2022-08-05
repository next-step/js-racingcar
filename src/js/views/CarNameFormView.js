import View from './View.js';
import { $ } from '../utils.js';

export default class CarNameFormView extends View {
  constructor(element = $('#car-name-component')) {
    super(element);
    this.inputElement = $('#input-car-name');
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
}
