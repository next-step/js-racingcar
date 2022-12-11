import { handleAddEventListener } from '../utils/eventListener.js';

import RacingGameModel from '../models/RacingGameModel.js';
import { INVALID_RACING_COUNT_MESSAGE } from '../constants.js';
import { showRacingCarDashboard } from './racingCarDashboard.js';

const $racingCountInput = document.querySelector('#racingCountInput');
const $racingCountSubmitButton = document.querySelector('#racingCountSubmit');

const handleSubmitRacingCount = () => {
  const submittedCount = Number($racingCountInput.value);
  if (!isValidCount(submittedCount)) {
    alert(INVALID_RACING_COUNT_MESSAGE);
    return;
  }
  RacingGameModel.setRacingCount(submittedCount);
  disableButton();
  showRacingCarDashboard();
};

const isValidCount = (count) => !isNaN(count) && count > 0;

const disableButton = () => {
  $racingCountSubmitButton.disabled = true;
};

export const initRacingCountFormView = () => {
  handleAddEventListener({
    targetDom: $racingCountSubmitButton,
    event: 'click',
    callback: handleSubmitRacingCount,
  });
};
