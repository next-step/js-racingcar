import racingCarModel from '../model/RacingCarModel.js';
import {
  disableCarAttemptsCountForm,
  disableCarNameForm,
  getCarAttemptsCount,
  getCarName,
  renderCarRoad,
  renderWinners,
  showCarAttemptsCountForm,
} from '../view/racingCar.js';
import { validateCarAttemptsCount, validateCarName } from '../utils/validator.js';
import { gameStart, getWinners } from '../service/racingCar.js';

export const handleCarNameSubmit = (e) => {
  e.preventDefault();

  try {
    racingCarModel.name = getCarName();

    validateCarName(racingCarModel.name);

    disableCarNameForm();
    showCarAttemptsCountForm();
  } catch (error) {
    alert(error.message);
  }
};

export const handleCarAttemptsCountSubmit = async (e) => {
  e.preventDefault();

  try {
    racingCarModel.attemptsCount = getCarAttemptsCount();
    validateCarAttemptsCount(racingCarModel.attemptsCount);

    disableCarAttemptsCountForm();
    renderCarRoad(racingCarModel.name);
    await gameStart();
    racingCarModel.winners = getWinners(racingCarModel.name, racingCarModel.record);
    renderWinners(racingCarModel.winners);
  } catch (error) {
    alert(error.message);
  }
};
