import RacingCarNamesView from './RacingCarNamesView.js';
import RandomMovingStrategy from '../RandomMovingStrategy.js';
import Game from '../Game.js';
import AbstractView from './AbstractView.js';

const $section = document.querySelector('#game');
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

class IRacingSectionView extends AbstractView {
  #settingCar(car) {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="mr-2" id="${car.line}"><div class="car-player">${car.name}</div></div>`;
    return $template.content.firstChild;
  }

  #settingCarToLine(cars) {
    const $template = document.createElement('template');
    $template.innerHTML = '<div class="mt-4 d-flex"></div>';
    const $result = $template.content.firstChild;
    $result.append(...cars.map((car) => this.#settingCar(car)));
    $section.replaceChildren($result);
  }

  #removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  #carLine(car) {
    return $section.querySelector(`#${car.line}`);
  }

  #movePosition(car) {
    this.#carLine(car).appendChild(moveTemplate());
  }

  #stopPosition(car) {
    this.#carLine(car).appendChild(stopTemplate());
  }

  #changeCarPosition(car) {
    if (car.isMoveStatus()) {
      this.#movePosition(car);
      return;
    }
    this.#stopPosition(car);
  }

  #runningLap(carList) {
    this.#removeStopPositionAllCar();
    carList.forEach((car) => {
      car.run(RandomMovingStrategy);
      this.#changeCarPosition(car);
    });
  }

  #runningLapByCycle({ cycle, carList }) {
    new Array(Number(cycle)).fill().forEach(() => this.#runningLap(carList));
  }

  #showWinner(winner) {
    $winner.textContent = winner;
    this.#showResult();
  }

  #showGame() {
    $section.classList.remove('hide');
  }

  #initializeGame() {
    $section.replaceChildren('');
    $section.classList.add('hide');
  }

  #showResult() {
    $resultSection.classList.remove('hide');
  }

  #hideResult() {
    $resultSection.classList.add('hide');
  }

  ready() {
    Game.readyCars(RacingCarNamesView.carNameList());
    this.#settingCarToLine(Game.cars);
    this.#showGame();
  }

  start(cycle) {
    this.#runningLapByCycle({
      cycle,
      carList: Game.cars,
    });
    this.#showWinner(Game.winner);
  }

  initialize() {
    Game.initialize();
    this.#initializeGame();
    this.#hideResult();
  }

  eventBindings(onInitialize) {
    $restart.addEventListener('click', onInitialize);
  }
}
const RacingSectionView = new IRacingSectionView();
Object.freeze(RacingSectionView);
export default RacingSectionView;
