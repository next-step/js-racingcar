import View from './View.js';
import { $ } from '../utils.js';

export default class RaceCountFormView extends View {
  constructor(element = $('#race-count-component')) {
    super(element);
    this.inputElement = $('#input-race-count');
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

  show(cars) {
    if (!cars.length) return this.hide();
    super.show();
  }
}
