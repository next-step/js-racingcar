import racingCarGameModel from '../model/RacingCarGameModel.js';
import { RacingCarModel } from '../model/RacingCarModel.js';
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
    const carNames = getCarName()
      .split(',')
      .map((elem) => elem.trim());
    validateCarName(carNames);

    carNames.forEach((carName) => {
      racingCarGameModel.cars.push(new RacingCarModel(carName));
      racingCarGameModel.record[carName] = 0;
    });

    disableCarNameForm();
    showCarAttemptsCountForm();
  } catch (error) {
    alert(error.message);
  }
};

export const handleCarAttemptsCountSubmit = async (e) => {
  e.preventDefault();

  try {
    const attemptsCount = getCarAttemptsCount();
    validateCarAttemptsCount(racingCarGameModel.attemptsCount);
    racingCarGameModel.attemptsCount = attemptsCount;

    disableCarAttemptsCountForm();
    renderCarRoad(racingCarGameModel.cars);

    await gameStart();
    window.record = racingCarGameModel.record;

    racingCarGameModel.winners = getWinners(racingCarGameModel.record);
    window.winners = racingCarGameModel.winners;

    renderWinners(racingCarGameModel.winners);
  } catch (error) {
    alert(error.message);
  }
};
