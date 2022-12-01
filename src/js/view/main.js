import { $ } from '../utils/selector.js';

export const showTrialForm = () => {
  $('.trial-form').classList.remove('hide');
};

export const focusNameInput = () => {
  $('.car-name-input').focus();
};

export const disabledNameForm = () => {
  $('.car-name-input').disabled = true;
  $('.car-name-submit-btn').disabled = true;
};

export const focusTrialInput = () => {
  $('.trial-input').focus();
};

export const disabledTrialForm = () => {
  $('.trial-submit-btn').disabled = true;
  $('.trial-input').disabled = true;
};

export const showResult = () => {
  $('.game-result').classList.remove('hide');
};

export const updateResult = gameResult => {
  let template = `<div class="mt-4 d-flex">`;

  Object.entries(gameResult).forEach(el => {
    template += `
			<div class="mr-2">
				<div class="car-player">${el[0]}</div>
				${el[1].map(inner => (inner ? `<div class="forward-icon mt-2">⬇️️</div>` : '')).join('')}
			</div>`;
  });

  template += `</div>`;
  $('.game-result').innerHTML = template;
};
