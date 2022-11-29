import { handleSubmitCarName, handleSubmitTrialTimes } from './handler.js';
import { $, SELECTOR } from './utils/selector.js';

const setEvent = () => {
  $(SELECTOR.CAR_NAME_BUTTON).addEventListener('click', () =>
    handleSubmitCarName()
  );

  $(SELECTOR.TRIAL_NUMBER_BUTTON).addEventListener('click', () =>
    handleSubmitTrialTimes()
  );
};

setEvent();
