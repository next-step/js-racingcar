import View from './View.js';
import { $ } from '../utils.js';

export default class RaceCountFormView extends View {
  constructor(element = $('#race-count-component')) {
    super(element);
    this.inputElement = $('#input-race-count');
    this.buttonElement = $('#submit-race-count');
    this.bindEvents();
    this.hide();
  }

  bindEvents() {
    this.on('submit', (event) => this.submitRaceCount(event));
  }

  submitRaceCount(event) {
    event.preventDefault();
    const { value: raceCount } = this.inputElement;
    this.emit('@submit', raceCount);
  }

  #disableButton(isDisabled) {
    this.inputElement.disabled = isDisabled;
    this.buttonElement.disabled = isDisabled;
  }

  show(cars, tryCount) {
    if (!cars.length) return this.hide();
    this.inputElement.value = tryCount;
    this.#disableButton(!!tryCount);
    super.show();
  }
}
