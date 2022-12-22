/* eslint-disable arrow-body-style */
import { $, $$ } from '../utils/selector.js';

export const showTrialForm = () => {
  $('.trial-form').classList.remove('hide');
};

export const hideTrialForm = () => {
  $('.trial-form').classList.add('hide');
};

export const focusNameInput = () => {
  $('.car-name-input').focus();
};

export const toggleDisabledName = () => {
  $('.car-name-input').disabled = !$('.car-name-input').disabled;
  $('.car-name-submit-btn').disabled = !$('.car-name-submit-btn').disabled;
};

export const resetNameForm = () => {
  $('.name-form').reset();
};

export const focusTrialInput = () => {
  $('.trial-input').focus();
};

export const resetTrialForm = () => {
  $('.trial-form').reset();
};

export const toggleDisabledTrial = () => {
  $('.trial-submit-btn').disabled = !$('.trial-submit-btn').disabled;
  $('.trial-input').disabled = !$('.trial-input').disabled;
};

export const showDistance = () => {
  $('.game-result').classList.remove('hide');
};

export const hideDistance = () => {
  $('.game-result').classList.add('hide');
};

export const updateDistance = result => {
  $('.game-result').innerHTML = ` 
		<div class="mt-4 d-flex">
    ${result
      .map(
        ([name, _]) => `
  				<div class="mr-2 result-container">
  					<div class="car-player">${name}</div>
						<div class="cars"></div>
					</div>`,
      )
      .join('')}
  </div>`;
};

export const showWinner = () => {
  $('.winner-section').classList.remove('hide');
};

const alertCongrats = () => {
  setTimeout(() => alert('축하합니다🎉🎉🎉'), 2000);
};

export const addLoadingHTML = () => {
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

export const removeLoadingHTML = () => {
  $$('.loading').forEach($loading => $loading.remove());
};

export const renderProcess = carList => {
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

export const timeoutSetting = (interval, trialCount) => {
  setTimeout(() => {
    clearInterval(interval);
    alertCongrats();
    removeLoadingHTML();
    showWinner();
  }, trialCount * 1000);
};

export const hideWinner = () => {
  $('.winner-section').classList.add('hide');
};

export const updateWinner = winners => {
  $('.winners').innerHTML = `
	🏆 최종 우승자: ${winners.map(winner => `${winner}`).join(', ')} 🏆</h2>`;
};
