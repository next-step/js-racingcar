import RacingCarNamesView from './RacingCarNamesView.js';
import RandomMovingStrategy from '../RandomMovingStrategy.js';
import Cars from '../Cars.js';
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
  #settingCar(car, lineNumber) {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="mr-2" id="car-line-${lineNumber}"><div class="car-player">${car.name}</div></div>`;
    return $template.content.firstChild;
  }

  #settingCarToLine(cars) {
    const $template = document.createElement('template');
    $template.innerHTML = '<div class="mt-4 d-flex"></div>';
    const $result = $template.content.firstChild;
    $result.append(...cars.map((car, index) => this.#settingCar(car, index)));
    $section.replaceChildren($result);
  }

  #removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  #carLine(car, lineNumber) {
    return $section.querySelector(`#car-line-${lineNumber}`);
  }

  #movePosition(car, lineNumber) {
    this.#carLine(car, lineNumber).appendChild(moveTemplate());
  }

  #stopPosition(car, lineNumber) {
    this.#carLine(car, lineNumber).appendChild(stopTemplate());
  }

  #changeCarPosition(car, lineNumber) {
    if (car.isMoveStatus()) {
      this.#movePosition(car, lineNumber);
      return;
    }
    this.#stopPosition(car, lineNumber);
  }

  #runningLap(carList) {
    this.#removeStopPositionAllCar();
    carList.forEach((car, index) => {
      car.run(RandomMovingStrategy);
      this.#changeCarPosition(car, index);
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
    Cars.readyCars(RacingCarNamesView.carNameList());
    this.#settingCarToLine(Cars.carList);
    this.#showGame();
  }

  start(cycle) {
    this.#runningLapByCycle({
      cycle,
      carList: Cars.carList,
    });
    this.#showWinner(Cars.winner);
  }

  initialize() {
    Cars.initialize();
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
