import RacingCarNamesView from './RacingCarNamesView.js';
import { Car } from '../Car.js';

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
  const $section = document.querySelector('section > div.mt-4.d-flex');

  function player(carName) {
    return `<div class="car-player">${carName}</div>`;
  }

  function carSetting(carName) {
    const $car = document.createElement('div');
    $car.classList.add('mr-2');
    $car.innerHTML = player(carName);
    return $car;
  }

  function settingCars(carNameList) {
    const $result = new DocumentFragment();
    $result.append(...carNameList.map((carName) => carSetting(carName)));
    return $result;
  }

  function ready() {
    $section.replaceChildren(settingCars(RacingCarNamesView.carNameList()));
  }

  function removeStopPositionAllCar() {
    $section
      .querySelectorAll('div.mt-3')
      .forEach(($stopPosition) => $stopPosition.remove());
  }

  function movePosition(car) {
    car.$target.appendChild(moveTemplate());
  }

  function stopPosition(car) {
    car.$target.appendChild(stopTemplate());
  }

  function changeCarPosition(car) {
    if (car.isMoveStatus()) {
      movePosition(car);
      return;
    }
    stopPosition(car);
  }

  function runningLap(carList) {
    removeStopPositionAllCar();
    carList.forEach((car) => {
      car.run();
      changeCarPosition(car);
    });
  }

  function runningLapByCycle({ cycle, carList }) {
    new Array(Number(cycle)).fill().forEach(() => runningLap(carList));
  }

  function cars() {
    const $lines = $section.querySelectorAll('div.mr-2');
    return [...$lines].map(($line) => {
      const carName = $line.querySelector('.car-player');
      return new Car({ name: carName, target: $line });
    });
  }

  function start(cycle) {
    runningLapByCycle({ cycle, carList: cars() });
  }

  return { ready, start };
})();
export default RacingSectionView;
