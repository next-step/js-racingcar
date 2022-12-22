import { $ } from '../utils/selector.js';

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
  focusNameInput();
};

export const resetTrial = () => {
  resetTrialForm();
  toggleDisabledTrial();
  hideTrialForm();
};

export const resetResult = () => {
  updateDistance([]);
  hideDistance();
  updateWinner([]);
  hideWinner();
};
