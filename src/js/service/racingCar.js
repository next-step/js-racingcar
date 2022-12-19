import { catchMessage, getType } from '../validate/validate.js';
import ERROR_MESSAGES from '../constant/errorMessages.js';
import car from '../model/Car.js';
import racingResult from './racingResult.js';
import { TRIAL_COUNT_MIN } from '../constant/racingcar.js';

const racingCar = {
  resetAll() {
    car.names = [];
    car.trialCount = 0;
    car.gameResult = [];
  },

  isValidTrialCount: catchMessage('window', trialCount => {
    if (trialCount < TRIAL_COUNT_MIN) throw new Error(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    if (getType(trialCount) !== 'Number') throw new Error(ERROR_MESSAGES.INVALID_TYPE);
    return true;
  }),

  generateGame() {
    return car.names.reduce((acc, name) => ({ ...acc, [name]: racingResult.getGameResult() }), {});
  },
};

export default racingCar;
