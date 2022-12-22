import cars from '../model/Cars.js';
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
