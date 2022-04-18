import { validateName } from './carName.js';

const cars = {
  validateNames: (carNameList) => {
    carNameList.forEach((carName) => validateName(carName));
  },
};
export default cars;
