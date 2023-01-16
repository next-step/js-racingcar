import disableElements from './disableElements.js';
import showAttemptCountField from './showAttemptCountField.js';
import Car from '../domain/Car.js';

export default function initializeCarNames(e) {
  e.preventDefault();

  const carName = document.querySelector('.car-name');
  const carNameButton = document.querySelector('.btn-car-name');

  try {
    const car = new Car(carName.value);
    car.validateCarName();
    disableElements(carName, carNameButton);
    showAttemptCountField();
  } catch (error) {
    alert(error);
    console.log(error);
    return;
  }
}
