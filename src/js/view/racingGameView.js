import cars from '../model/Cars.js';
import { $, $$ } from '../utils/selector.js';
import { updateDistance, updateWinner, focusTrialInput } from './main.js';
import { CONGRATS_MESSAGE } from '../constant/ui.js';
import { ONE_MILLISECOND } from '../constant/racingcar.js';

const CONGRATS_MILLISECONDS = 2000;
const DISTANCE_ICON️ = '⬇️';

const showDistance = () => {
  $('.game-result').classList.remove('hide');
};

const addLoadingHTML = () => {
  const loadingHTML = `
  <div class="d-flex justify-center mt-3 loading">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div> 
`;

  document.querySelectorAll('.result-container').forEach($el => {
    const $container = $el.querySelector('.cars');
    $container.insertAdjacentHTML('beforeend', loadingHTML);
  });
};

const renderProcess = carList => {
  const moveHTML = `<div class="forward-icon mt-2">${DISTANCE_ICON️}</div>`;
  const $cars = document.querySelectorAll('.result-container');

  let carIndex = 0;
  const moveInterval = setInterval(() => {
    $cars.forEach($car => {
      const carName = $car.querySelector('.car-player').innerHTML;
      const isCorrectName = carList.find(car => car.name === carName).process[carIndex];

      $car
        .querySelector('.cars')
        .insertAdjacentHTML('afterbegin', `${isCorrectName === true ? moveHTML : ''}`);
    });
    carIndex += 1;
  }, ONE_MILLISECOND);

  return moveInterval;
};

const alertCongrats = () => {
  setTimeout(() => alert(CONGRATS_MESSAGE), CONGRATS_MILLISECONDS);
};

const removeLoadingHTML = () => {
  $$('.loading').forEach($loading => $loading.remove());
};

const showWinner = () => {
  $('.winner-section').classList.remove('hide');
};

const timeoutSetting = (interval, trialCount) => {
  setTimeout(() => {
    clearInterval(interval);
    alertCongrats();
    removeLoadingHTML();
    showWinner();
  }, trialCount * ONE_MILLISECOND);
};

export const generateGame = () => {
  try {
    cars.generateGame();
    updateDistance(cars.result);
    showDistance();
    addLoadingHTML();
    const interval = renderProcess(cars.carList);
    timeoutSetting(interval, cars.trialCount);
    updateWinner(cars.winners);
  } catch (e) {
    alert(e.message);
    focusTrialInput();
  }
};
