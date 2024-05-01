import CONSTANTS from '../constants/Constants.js';
import ERROR from '../constants/Error.js';

const Validator = {
  validateUserInput(input) {
    if (input === CONSTANTS.emptyString) {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarNames(cars) {
    const carNames = cars.map(car => car.name);

    if (!this.isValidCarNameLength(carNames)) {
      throw new Error(ERROR.invalidNameLength);
    }
    if (!this.isValidCarNamesFormat(carNames)) {
      throw new Error(ERROR.invalidFormat);
    }
    if (!this.isValidDuplicate(carNames)) {
      throw new Error(ERROR.duplicateValue);
    }
  },

  isValidCarNameLength(names) {
    return names.every(name => name.length <= CONSTANTS.car.maxNameLength);
  },

  isValidCarNamesFormat(names) {
    return names.every(name => name.length !== 0 && !name.includes(' '));
  },

  isValidDuplicate(names) {
    return names.length === new Set(names).size;
  },
};

export default Validator;
