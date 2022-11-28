import model from '../model/Model.js';
import { assertCarAttemptsCount, assertCarName } from '../utils/validator.js';
import {
  disableCarAttemptsCountForm,
  disableCarNameForm,
  getCarAttemptsCount,
  getCarName,
  renderCarRoad,
  showCarAttemptsCountForm,
} from '../view/racingCar.js';

export const handleCarNameSubmit = (e) => {
  e.preventDefault();

  try {
    model.carName = getCarName();

    assertCarName(model.carName);

    disableCarNameForm();
    showCarAttemptsCountForm();
  } catch (error) {
    alert(error.message);
  }
};

export const handleCarAttemptsCountSubmit = (e) => {
  e.preventDefault();

  try {
    const carAttemptsCount = getCarAttemptsCount();
    assertCarAttemptsCount(carAttemptsCount);

    disableCarAttemptsCountForm();
    renderCarRoad(model.carName);
    model.gameStart();
  } catch (error) {
    alert(error.message);
  }
};
