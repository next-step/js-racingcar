import { validateName } from './car.js';

const cars = {
  validateNames: (carNameList) => {
    carNameList.forEach((carName) => validateName(carName));
  },
};
export default cars;
