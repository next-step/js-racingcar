import { isValidName, isValidNumber } from './utils/validator.js';
import {
  disableCarName,
  disableTrialNumber,
  getCarName,
  getTrialTimes,
  renderRace,
  visibleRaceTimes,
} from './ui/dom.js';
import { readyRace, startRace } from './race.js';
import { CAR_NAME, ERROR_MESSAGE } from './constant.js';

export const handleSubmitCarName = () => {
  const isValidCarName = isValidName(getCarName(), CAR_NAME.MIN, CAR_NAME.MAX);
  if (isValidCarName) {
    visibleRaceTimes();
    disableCarName();
  } else {
    alert(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
  }
};

export const handleSubmitTrialTimes = async () => {
  const isValidTrialTimes = isValidNumber(getTrialTimes(), 1);
  if (isValidTrialTimes) {
    renderRace();
    disableTrialNumber();

    const { cars, times } = readyRace();
    const raceResult = await startRace(cars, times);
  } else {
    alert(ERROR_MESSAGE.INVALID_TRIAL_NUMBER);
  }
};
