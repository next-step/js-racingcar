import model from '../model/Model.js';
import {
  disableCarAttemptsCountForm,
  disableCarNameForm,
  getCarAttemptsCount,
  getCarName,
  renderCarRoad,
  showCarAttemptsCountForm,
} from '../view/racingCar.js';
import { validateCarAttemptsCount, validateCarName } from '../utils/validator.js';
import { gameStart } from '../service/racingCar.js';

export const handleCarNameSubmit = (e) => {
  e.preventDefault();

  try {
    model.carName = getCarName();

    validateCarName(model.carName);

    disableCarNameForm();
    showCarAttemptsCountForm();
  } catch (error) {
    alert(error.message);
  }
};

export const handleCarAttemptsCountSubmit = (e) => {
  e.preventDefault();

  try {
    model.carAttemptsCount = getCarAttemptsCount();
    validateCarAttemptsCount(model.carAttemptsCount);

    disableCarAttemptsCountForm();
    renderCarRoad(model.carName);
    gameStart();
  } catch (error) {
    alert(error.message);
  }
};
