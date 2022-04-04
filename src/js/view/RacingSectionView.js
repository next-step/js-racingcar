import RacingCarNamesView from './RacingCarNamesView.js';

const RacingSectionView = (function () {
  const $section = document.querySelector('#racing');

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
    carNameList.forEach((carName) => {
      $result.appendChild(carSetting(carName));
    });
    return $result;
  }

  function ready() {
    const $result = document.createElement('div');
    $result.classList.add('mt-4', 'd-flex');
    $section.appendChild(settingCars(RacingCarNamesView.carNameList()));
  }

  return { ready };
})();
export default RacingSectionView;
