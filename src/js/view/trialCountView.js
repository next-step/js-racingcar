import cars from '../model/Cars.js';
import { $, $$ } from '../utils/selector.js';
import { toggleDisabledTrial, focusTrialInput } from './main.js';

export const submitTrialCount = trialCount => {
  try {
    cars.setTrialCount(trialCount);
    toggleDisabledTrial();
  } catch (e) {
    alert(e.message);
    focusTrialInput();
  }
};
