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
import { showErrorMessage, validate } from './utils/util.js';
import { nameValidations, trialTimesValidations } from './utils/validations.js';

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
    showErrorMessage(error);
  }
};

export const handleFormTrialTimesForm = async (event) => {
  const [trialTimesInput] = event.target;
  event.preventDefault();

  try {
    const trialTimes = parseInt(trialTimesInput.value);
    validate(trialTimes, trialTimesValidations);

    renderRace();
    disableTrialNumber();

    const raceResult = await startRace(Cars.cars, trialTimes);
    renderWinner(getWinner(raceResult));
  } catch (error) {
    showErrorMessage(error);
  }
};
