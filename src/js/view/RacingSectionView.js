import RacingCarNamesView from './RacingCarNamesView.js';
import { Car } from '../Car.js';
import RandomMovingStrategy from '../RandomMovingStrategy.js';

const $section = document.querySelector('section > div.mt-4.d-flex');

function moveTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `<div class="forward-icon mt-2">⬇️️</div>`;
  return $template.content.firstChild;
}

function stopTemplate() {
  const $template = document.createElement('template');
  $template.innerHTML = `<div class="d-flex justify-center mt-3">
                      <div class="relative spinner-container">
                        <span class="material spinner"></span>
                      </div>
                    </div>`;
  return $template.content.firstChild;
}

function player(carName) {
  return `<div class="car-player">${carName}</div>`;
}

class RacingSectionView {
  static #cars() {
    const $lines = $section.querySelectorAll('div.mr-2');
    return [...$lines].map(($line) => {
      const carName = $line.querySelector('.car-player');
      return new Car({ name: carName, target: $line });
    });
  }

  static #carSetting(carName) {
    const $car = document.createElement('div');
    $car.classList.add('mr-2');
    $car.innerHTML = player(carName);
    return $car;
  }

  static #settingCars(carNameList) {
    const $result = new DocumentFragment();
    $result.append(...carNameList.map((carName) => this.#carSetting(carName)));
    return $result;
  }

  static #removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  static #movePosition(car) {
    car.$target.appendChild(moveTemplate());
  }

  static #stopPosition(car) {
    car.$target.appendChild(stopTemplate());
  }

  static #changeCarPosition(car) {
    if (car.isMoveStatus()) {
      this.#movePosition(car);
      return;
    }
    this.#stopPosition(car);
  }

  static #runningLap(carList) {
    this.#removeStopPositionAllCar();
    carList.forEach((car) => {
      car.run(new RandomMovingStrategy());
      this.#changeCarPosition(car);
    });
  }

  static #runningLapByCycle({ cycle, carList }) {
    new Array(Number(cycle)).fill().forEach(() => this.#runningLap(carList));
  }

  static start(cycle) {
    this.#runningLapByCycle({
      cycle,
      carList: this.#cars(),
    });
  }

  static ready() {
    $section.replaceChildren(
      this.#settingCars(RacingCarNamesView.carNameList())
    );
  }
}
export default RacingSectionView;
