import RacingCar from '../model/RacingCar.js';
import validateCarName from '../model/validateCarName.js';
import disableElements from './disableElements.js';
import showAttemptCountField from './showAttemptCountField.js';

export default function initializeCarNames(e) {
  e.preventDefault();

  const carName = document.querySelector('.car-name');
  const carNameButton = document.querySelector('.btn-car-name');

  try {
    const result = validateCarName(carName.value);
    RacingCar.cars = result;
    disableElements(carName, carNameButton);
    showAttemptCountField();
  } catch (error) {
    alert(error);
    console.log(error);
    return;
  }
}
