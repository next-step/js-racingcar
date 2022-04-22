import randomMovingStrategy from '../RandomMovingStrategy.js';
import cars from '../Cars.js';

const $section = document.querySelector('#game');
const $resultSection = document.querySelector('#result');
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

const RacingSectionView = (function () {
  function showResult() {
    $resultSection.classList.remove('hide');
  }

  function hideResult() {
    $resultSection.classList.add('hide');
  }

  function settingCar(car, lineNumber) {
    const $template = document.createElement('template');
    $template.innerHTML = `<div class="mr-2" id="car-line-${lineNumber}"><div class="car-player">${car.name}</div></div>`;
    return $template.content.firstChild;
  }

  function settingCarToLine(carList) {
    const $template = document.createElement('template');
    $template.innerHTML = '<div class="mt-4 d-flex"></div>';
    const $result = $template.content.firstChild;
    $result.append(...carList.map((car, index) => settingCar(car, index)));
    $section.replaceChildren($result);
  }

  function removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  function carLine(car, lineNumber) {
    return $section.querySelector(`#car-line-${lineNumber}`);
  }

  function movePosition(car, lineNumber) {
    carLine(car, lineNumber).appendChild(moveTemplate());
  }

  function stopPosition(car, lineNumber) {
    carLine(car, lineNumber).appendChild(stopTemplate());
  }

  function changeCarPosition(car, lineNumber) {
    if (car.isMoveStatus()) {
      movePosition(car, lineNumber);
      return;
    }
    stopPosition(car, lineNumber);
  }

  function runningLap(carList) {
    removeStopPositionAllCar();
    carList.forEach((car, index) => {
      car.run(randomMovingStrategy);
      changeCarPosition(car, index);
    });
  }

  function runningLapByCycle({ cycle, carList }) {
    new Array(Number(cycle)).fill().forEach(() => runningLap(carList));
  }

  function showWinner(winner) {
    $winner.textContent = winner;
    showResult();
  }

  function showGame() {
    $section.classList.remove('hide');
  }

  function initializeGame() {
    $section.replaceChildren('');
    $section.classList.add('hide');
  }

  function ready() {
    settingCarToLine(cars.carList());
    showGame();
  }

  function start(cycle) {
    runningLapByCycle({
      cycle,
      carList: cars.carList(),
    });
    showWinner(cars.winner());
  }

  function initialize() {
    cars.initialize();
    initializeGame();
    hideResult();
  }

  return { initialize, ready, start };
})();
export default RacingSectionView;
