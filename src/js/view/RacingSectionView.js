import RacingCarNamesView from './RacingCarNamesView.js';
import { Car } from '../Car.js';

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

  function runningLap(cars) {
    cars.forEach((car) => {
      car.run();
    });
  }

  function start(cycle) {
    const $lines = $section.querySelectorAll('div.mr-2');
    const cars = [...$lines].map(($line) => {
      const carName = $line.querySelector('.car-player');
      return new Car({ name: carName, target: $line });
    });
    new Array(Number(cycle)).fill().forEach(() => runningLap(cars));
  }

  return { ready, start };
})();
export default RacingSectionView;
