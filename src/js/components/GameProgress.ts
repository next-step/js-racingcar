import Component from '../core/Component';
import Car from '../service/Car';
import { $ } from '../utils/querySelector';

const spinnerTemplate = /*html*/ `
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  `;

const progressTemplate = /*html */ `
    <div class="forward-icon mt-2">⬇️️</div>
  `;

class Progress extends Component {
  template = /*html*/ `
    <div class="js-container mt-4 d-flex"></div>
  `;

  $container?: HTMLDivElement;

  deriveChildren(): void {
    this.$container = $('.js-container', this) as HTMLDivElement;
  }

  onUpdate(): void {
    this.renderRaceProgress();
  }

  renderRaceProgress() {
    const { cars } = this.props;

    if (!cars.length) {
      this.$container!.innerHTML = '';
      return;
    }

    cars.forEach((car: Car) => this.renderCarProgress(car));
  }

  renderCarProgress(car: Car) {
    const $carContainer = document.createElement('div');
    const $carName = document.createElement('div');
    const $spinner = document.createElement('div');

    $carContainer.classList.add('mr-2');
    $carName.classList.add('car-player');
    $carName.innerText = car.carName;
    $spinner.classList.add('d-flex', 'justify-center', 'mt-3');
    $spinner.insertAdjacentHTML('afterbegin', spinnerTemplate);

    $carContainer.append($carName);
    $carContainer.insertAdjacentElement('beforeend', $spinner);

    let racePhase = 0;

    const timerId = setInterval(() => {
      if (car.gameResult[racePhase] === 1) {
        $spinner.insertAdjacentHTML('beforebegin', progressTemplate);
      }

      racePhase++;

      if (racePhase === car.gameResult.length) {
        clearInterval(timerId);
        $spinner.remove();
      }
    }, 1000);

    this.$container?.append($carContainer);
  }
}

customElements.define('my-game-progress', Progress);
