/* eslint-disable arrow-body-style */
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
  $('.game-result').innerHTML = `
		<div class="mt-4 d-flex">
			${Object.entries(gameResult)
        .map(
          ([key, value]) => `
					<div class="mr-2 result-container">
						<div class="car-player">${key}</div>
						${value
              .filter(Boolean)
              .map(_ => `<div class="forward-icon mt-2">⬇️️</div>`)
              .join('')}
						</div>`,
        )
        .join('')}
		</div>`;
};

export const alertIfError = callback => {
  return (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      return alert(error.message);
    }
  };
};

export const updateWinner = winners => {
  $('.winner-section').innerHTML = `
		<div>
			<h2 class="text-center">🏆 최종 우승자: ${winners.map(winner => `${winner}`).join(', 	')} 🏆</h2>
			<div class="d-flex justify-center ">
				<button type="button" class="btn btn-cyan">다시 시작하기</button>
			</div>
		</div>`;
};
