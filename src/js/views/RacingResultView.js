import View from './View.js';
import { $ } from '../utils.js';

export class RacingResultView extends View {
  constructor(element = $('#game-result-component')) {
    super(element);
    this.winnerNameElement = $('#winners');
    this.buttonElememt = $('#reset');
    this.bindEvents();
  }

  bindEvents() {
    this.buttonElememt.addEventListener('click', this.handleReset.bind(this));
  }

  handleReset() {
    this.emit('@reset');
  }

  #renderWinners(cars) {
    const winNumber = Math.max(...cars.map((car) => car.location));
    const winner = cars
      .filter((car) => car.location === winNumber)
      .map((car) => car.name)
      .join(',');

    this.winnerNameElement.textContent = winner;
  }

  show(cars, tryCount) {
    const isRaceBegan = !!(cars.length && tryCount);
    if (!isRaceBegan) return this.hide();
    this.#renderWinners(cars);
    super.show();
  }
}
