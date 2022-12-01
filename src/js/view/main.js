import { $ } from '../utils/selector.js';

export const getTrialInputValue = () => Number($('.trial-input').value);
export const getNameInputValue = () => $('.car-name-input').value;

export const showTrialForm = () => {
  $('.trial-container').classList.remove('hide');
};

export const focusNameInput = () => {
  $('.car-name-input').focus();
};

export const disabledNameInput = () => {
  $('.car-name-input').disabled = true;
};

export const focusTrialInput = () => {
  $('.trial-input').focus();
};

export const disabledTrialInput = () => {
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
