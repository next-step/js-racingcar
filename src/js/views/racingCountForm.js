import { handleAddEventListener } from '../utils/eventListener.js';

import { INVALID_RACING_COUNT_MESSAGE } from '../constants.js';
import { showRacingCarDashboard } from './racingCarDashboard.js';

const $racingCountInput = document.querySelector('#racingCountInput');
const $racingCountSubmitButton = document.querySelector('#racingCountSubmit');

const handleSubmitRacingCount = (racingGameModel) => {
  const submittedCount = Number($racingCountInput.value);
  if (!isValidCount(submittedCount)) {
    alert(INVALID_RACING_COUNT_MESSAGE);
    return;
  }
  racingGameModel.setRacingCount(submittedCount);
  disableButton();
  showRacingCarDashboard(racingGameModel);
};

const isValidCount = (count) => !isNaN(count) && count > 0;

const disableButton = () => {
  $racingCountSubmitButton.disabled = true;
};

export const initRacingCountFormView = (racingGameModel) => {
  handleAddEventListener({
    targetDom: $racingCountSubmitButton,
    event: 'click',
    callback: function () {
      handleSubmitRacingCount(racingGameModel);
    },
  });
};
