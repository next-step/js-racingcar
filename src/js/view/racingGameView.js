import cars from '../model/Cars.js';
import { $, $$ } from '../utils/selector.js';
import { updateDistance, updateWinner, focusTrialInput } from './main.js';

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
  const moveHTML = `<div class="forward-icon mt-2">⬇️️</div>`;
  const $cars = document.querySelectorAll('.result-container');

  let index = 0;
  const interval = setInterval(() => {
    $cars.forEach($el => {
      const carName = $el.querySelector('.car-player').innerHTML;
      const html = carList.find(el => el.name === carName).process[index];

      $el
        .querySelector('.cars')
        .insertAdjacentHTML('afterbegin', `${html === true ? moveHTML : ''}`);
    });
    index += 1;
  }, 1000);

  return interval;
};

const alertCongrats = () => {
  setTimeout(() => alert('축하합니다🎉🎉🎉'), 2000);
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
  }, trialCount * 1000);
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
