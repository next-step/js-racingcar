import { SELECTOR } from './constant.js';
import { handleFormNameSubmit, handleFormTrialTimesForm } from './handler.js';
import { $ } from './utils/selector.js';

const setEvent = () => {
  $(SELECTOR.CAR_NAME_FORM).addEventListener('submit', (event) =>
    handleFormNameSubmit(event)
  );
  $(SELECTOR.TRIAL_NUMBER_FORM).addEventListener('submit', (event) => {
    handleFormTrialTimesForm(event);
  });
};

setEvent();
