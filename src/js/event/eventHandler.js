import carName from '../service/carName.js';
import racingCar from '../service/racingCar.js';
import racingResult from '../service/racingResult.js';
import {
  showTrialForm,
  focusNameInput,
  focusTrialInput,
  updateResult,
  resetTrialForm,
  updateWinner,
  showWinner,
  showResult,
  hideResult,
  hideWinner,
  toggleDisabledName,
  resetNameForm,
  hideTrialForm,
  toggleDisabledTrial,
} from '../view/main.js';
import car from '../model/Car.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: nameInputValue } = event.target.elements['car-name'];
  const trimmedValue = carName.trimNames(nameInputValue);
  const names = carName.splitName(trimmedValue);

  if (!carName.isValidNames(names)) {
    focusNameInput();
    return;
  }
  car.names = names;
  toggleDisabledName();
  showTrialForm();
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  if (!racingCar.isValidTrialCount(trialCount)) {
    focusTrialInput();
    return;
  }

  car.trialCount = trialCount;
  toggleDisabledTrial();

  const gameResult = racingCar.generateGame();
  car.gameResult = gameResult;

  const winners = racingResult.getWinner();
  car.winners = winners;

  updateResult(gameResult);
  showResult();
  updateWinner(winners);
  showWinner();
};

export const handleClickReset = () => {
  racingCar.resetAll();
  resetNameForm();
  toggleDisabledName();

  resetTrialForm();
  toggleDisabledTrial();
  hideTrialForm();

  updateResult(car.gameResult);
  hideResult();
  updateWinner(car.winners);
  hideWinner();

  focusNameInput();
};
