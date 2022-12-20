// import  from '../model/Car.js';
// import CarName from '../model/CarName.js';
import racingCar from '../model/racingCar.js';
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
import cars from '../model/Cars.js';
import { trimNameList, splitNameList } from '../racingcar.js';

export const handleSubmitName = event => {
  event.preventDefault();
  const { value: carNames } = event.target.elements['car-name'];
  const trimmedList = trimNameList(carNames);
  const carNameList = splitNameList(trimmedList);

  try {
    cars.setCarNames(carNameList);
    toggleDisabledName();
    showTrialForm();
  } catch (e) {
    alert(e.message);
    focusNameInput();
  }

  // const trimmedValue = carName.trimNames(carNames);
  // const names = carName.splitName(trimmedValue);

  // 만약에 error 발생했으면 focusNameInput();

  // if (!carName.isValidNames(names)) {
  //   focusNameInput();
  //   return;
  // }
  // car.names = names;
  // toggleDisabledName();
  // showTrialForm();
};

export const handleSubmitTrialCount = event => {
  event.preventDefault();
  const trialCount = Number(event.target.elements['trial-count'].value);

  if (!racingCar.isValidTrialCount(trialCount)) {
    focusTrialInput();
    return;
  }

  cars.trialCount = trialCount;
  toggleDisabledTrial();

  const gameResult = racingCar.generateGame();
  cars.gameResult = gameResult;

  const winners = racingResult.getWinner();
  cars.winners = winners;

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

  updateResult(cars.gameResult);
  hideResult();
  updateWinner(cars.winners);
  hideWinner();

  focusNameInput();
};
