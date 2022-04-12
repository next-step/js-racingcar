import RacingCarNamesView from './RacingCarNamesView.js';
import RandomMovingStrategy from '../RandomMovingStrategy.js';
import Game from '../Game.js';

const $section = document.querySelector('section > div.mt-4.d-flex');
const $resultSection = document.querySelector('#result');
const $restart = $resultSection.querySelector('#restart');
const $winner = $resultSection.querySelector('#winner');

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

class RacingSectionView {
  static #settingCar(car) {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="mr-2" id="${car.line}"><div class="car-player">${car.name}</div></div>`;
    return $template.content.firstChild;
  }

  static #settingCarToLine(cars) {
    const $result = new DocumentFragment();
    $result.append(...cars.map((car) => this.#settingCar(car)));
    $section.replaceChildren($result);
  }

  static #removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  static #carLine(car) {
    return $section.querySelector(`#${car.line}`);
  }

  static #movePosition(car) {
    RacingSectionView.#carLine(car).appendChild(moveTemplate());
  }

  static #stopPosition(car) {
    RacingSectionView.#carLine(car).appendChild(stopTemplate());
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

  static #showWinner(winner) {
    $winner.textContent = winner;
    $resultSection.classList.remove('hide');
  }

  static ready() {
    Game.readyCars(RacingCarNamesView.carNameList());
    this.#settingCarToLine(Game.cars);
  }

  static start(cycle) {
    this.#runningLapByCycle({
      cycle,
      carList: Game.cars,
    });
    RacingSectionView.#showWinner(Game.winner);
    Game.end();
  }

  static eventBindings(onInitialize) {
    $restart.addEventListener('click', onInitialize);
  }
}
export default RacingSectionView;
