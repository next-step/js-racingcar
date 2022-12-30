import cars from '../model/Cars.js';
import { $ } from '../utils/selector.js';
import { focusNameInput, toggleDisabledName } from './main.js';
import CarName from '../model/CarName.js';
import Car from '../model/Car.js';

const CAR_NAME_SEPARATOR = ',';

export const processNameList = carNames =>
  carNames.split(CAR_NAME_SEPARATOR).map(name => name.trim());

export const showTrialForm = () => {
  $('.trial-form').classList.remove('hide');
};

export const submitNames = carNames => {
  try {
    const carNameList = cars.processNameList(carNames);
    cars.carList = carNameList.map(carName => new Car(new CarName(carName)));
    toggleDisabledName();
    showTrialForm();
  } catch (e) {
    alert(e.message);
    console.log(e);
    focusNameInput();
  }
};
