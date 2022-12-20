/* eslint-disable arrow-body-style */
import { $ } from '../utils/selector.js';

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

export const showResult = () => {
  $('.game-result').classList.remove('hide');
};

export const hideResult = () => {
  $('.game-result').classList.add('hide');
};

export const updateResult = result => {
  $('.game-result').innerHTML = `
  	<div class="mt-4 d-flex">
  		${result
        .map(
          ([name, distance]) => `
  				<div class="mr-2 result-container">
  					<div class="car-player">${name}</div>
  					${new Array(distance)
              .fill('')
              .map(_ => `<div class="forward-icon mt-2">⬇️️</div>`)
              .join('')}
					</div>`,
        )
        .join('')}
  	</div>`;
};

export const showWinner = () => {
  $('.winner-section').classList.remove('hide');
};

export const hideWinner = () => {
  $('.winner-section').classList.add('hide');
};

export const updateWinner = winners => {
  $('.winners').innerHTML = `
	🏆 최종 우승자: ${winners.map(winner => `${winner}`).join(', ')} 🏆</h2>`;
};
export const resetName = () => {
  resetNameForm();
  toggleDisabledName();
};

export const resetTrial = () => {
  resetTrialForm();
  toggleDisabledTrial();
  hideTrialForm();
};

export const resetResult = () => {
  updateResult([]);
  hideResult();
  updateWinner([]);
  hideWinner();
};
