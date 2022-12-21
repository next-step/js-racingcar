import { WINNER_MESSAGE } from './constant.js';
import { Car } from './model/Car.js';
import Cars from './model/Cars.js';
import { getWinner, startRace } from './race.js';
import {
  disableCarName,
  disableTrialNumber,
  renderRace,
  renderWinner,
  visibleRaceTimes,
} from './ui/dom.js';
import { validate } from './utils/validator.js';
import { nameValidations, trialTimesValidations } from './validations.js';

export const handleFormNameSubmit = (event) => {
  const [nameInput] = event.target;
  event.preventDefault();

  try {
    const names = nameInput.value.split(',').map((name) => name.trim());
    validate(names, nameValidations);

    Cars.cars = names.map((name) => new Car(name));
    visibleRaceTimes();
    disableCarName();
  } catch (error) {
    alert(error.message);
  }
};

export const handleFormTrialTimesForm = async (event) => {
  const [trialTimesInput] = event.target;
  event.preventDefault();

  try {
    const trialTimes = parseInt(trialTimesInput.value);
    validate(trialTimes, trialTimesValidations);

    renderRace(Cars.cars);
    disableTrialNumber();

    const raceResult = await startRace(Cars.cars, trialTimes);
    renderWinner(getWinner(raceResult));
    setTimeout(() => alert(WINNER_MESSAGE), 2000);
  } catch (error) {
    alert(error.message);
  }
};
