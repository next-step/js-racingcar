import { CarManager } from '../model/CarManager.js';
import { $ } from '../utils/selector.js';
import { renderAttemptCountInput, resetCarNameInput } from '../view/racingInputView.js';
import { renderRacingCar, resetAttemptInput } from '../view/racingProgressView.js';
import { progressRacing } from './racingProgressController.js';

export const registerCarName = () => {
  const carNames = $('#car-name-input').value;

  try {
    const racingCarList = new CarManager(carNames);
    renderAttemptCountInput();
    attemptCountEventLister(racingCarList);
  } catch (error) {
    resetCarNameInput();
  }
};

const attemptCountEventLister = (racingCarList) => {
  const attemptCountInput = $('#attempt-count-input');
  const attemptCountButton = $('#attempt-count-submit');

  attemptCountButton.addEventListener('click', () =>
    registerAttemptCount(racingCarList, attemptCountInput.value)
  );
  attemptCountInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      registerAttemptCount(racingCarList, attemptCountInput.value);
    }
  });
};

const registerAttemptCount = (racingCarList, attemptCountInput) => {
  try {
    racingCarList.attemptCount = attemptCountInput;
    renderRacingCar(racingCarList);
    progressRacing(racingCarList);
  } catch (error) {
    alert(error);
    resetAttemptInput();
  }
};
