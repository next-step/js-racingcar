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

const createSpinnerElement = () => {
  const $spinner = document.createElement('div');

  $spinner.classList.add('d-flex', 'justify-center', 'mt-3');
  $spinner.insertAdjacentHTML('afterbegin', spinnerTemplate);

  return $spinner;
};

const createCarNameElement = (carName: string) => {
  const $carName = document.createElement('div');

  $carName.classList.add('car-player');
  $carName.innerText = carName;

  return $carName;
};

const createCarContainerElement = (car: Car) => {
  const $carContainer = document.createElement('div');
  const $carName = createCarNameElement(car.carName);

  $carContainer.append($carName);

  $carContainer.classList.add('mr-2');

  return $carContainer;
};

class Progress extends Component {
  template = /*html*/ `
  <div class="js-container mt-4 d-flex"></div>
  `;

  $container?: HTMLDivElement;
  hasGameEnd: boolean = false;

  deriveChildren() {
    this.$container = $('.js-container', this) as HTMLDivElement;
  }

  onUpdate() {
    this.renderRaceProgress();
  }

  renderRaceProgress() {
    const { cars = [] } = this.props;

    this.$container!.innerHTML = '';
    cars.forEach((car: Car) => this.renderCarProgress(car));
  }

  renderCarProgress(car: Car) {
    const $carContainer = createCarContainerElement(car);
    const $spinner = createSpinnerElement();
    let racePhase = 0;

    $carContainer.insertAdjacentElement('beforeend', $spinner);

    const timerId = setInterval(() => {
      if (car.gameResult[racePhase] === 1) {
        $spinner.insertAdjacentHTML('beforebegin', progressTemplate);
      }

      racePhase++;

      if (racePhase === car.gameResult.length) {
        clearInterval(timerId);
        $spinner.remove();

        if (!this.hasGameEnd) this.endGame();
      }
    }, 1000);

    this.$container?.append($carContainer);
  }

  endGame() {
    this.hasGameEnd = true;
    this.props.processNextPhase();
    setTimeout(() => {
      alert('축하합니다!');
      this.hasGameEnd = false;
    }, 2000);
  }
}

customElements.define('my-game-progress', Progress);
