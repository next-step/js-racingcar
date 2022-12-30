import cars from '../model/Cars.js';
import { toggleDisabledTrial, focusTrialInput } from './main.js';
import TrialCount from '../model/TrialCount.js';

export const submitTrialCount = trialCount => {
  try {
    // cars.setTrialCount(trialCount);
    cars.trialCount = new TrialCount(trialCount);
    toggleDisabledTrial();
  } catch (e) {
    alert(e.message);
    console.log(e);
    focusTrialInput();
  }
};
