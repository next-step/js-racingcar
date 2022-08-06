import View from './View.js';
import { $ } from '../utils.js';

export default class RacingProgressView extends View {
  constructor(element = $('#game-progress-component')) {
    super(element);
  }

  #renderCarPlayers(cars) {
    return cars
      .map((car) => {
        return `
          <div class="mr-2">
            <div class="car-player" data-car-name="${car.name}">${car.name}</div>
          </div>
        `;
      })
      .join('');
  }

  #renderRacingProgress(cars) {
    cars.forEach((car) => {
      const $carPlayer = $(`.car-player[data-car-name="${car.name}"]`);
      $carPlayer.insertAdjacentHTML('afterend', '<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.location));
    });
  }

  #removeChildNode() {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  show(cars, tryCount) {
    const isRaceBegan = !!(cars.length && tryCount);
    if (!isRaceBegan) return this.hide();
    this.#removeChildNode();
    this.element.insertAdjacentHTML('afterbegin', this.#renderCarPlayers(cars));
    this.#renderRacingProgress(cars);
    super.show();
  }
}
