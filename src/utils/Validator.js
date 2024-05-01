import CONSTANTS from '../constants/Constants.js';
import ERROR from '../constants/Error.js';

const Validator = {
  validateUserInput(input) {
    if (input === CONSTANTS.emptyString) {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarNameLength(name) {
    if (name.length > CONSTANTS.car.maxNameLength) {
      throw new Error(ERROR.invalidNameLength);
    }
  },

  validateCarNames(cars) {
    const carNames = cars.map(car => car.name);

    this.validateCarNameFormat(carNames);
    this.validateDuplicate(carNames);
  },

  validateCarNameFormat(cars) {
    cars.forEach(car => {
      if (car.length === 0 || car.includes(' ')) {
        throw new Error(ERROR.invalidFormat);
      }
    });
  },

  validateDuplicate(cars) {
    if (cars.length !== new Set(cars).size) {
      throw new Error(ERROR.duplicateValue);
    }
  },
};

export default Validator;
