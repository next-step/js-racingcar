import CONSTANTS from '../constants/Constants.js';
import ERROR from '../constants/Error.js';

const Validator = {
  validateUserInput(input) {
    if (input === CONSTANTS.emptyString) {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarName(str) {
    if (str.length > CONSTANTS.car.maxNameLength) {
      throw new Error(ERROR.invalidNameLength);
    }
  },

  validateInputData(input) {
    const cars = input.map(car => car.name);

    this.validateDuplicate(cars);
    this.validateInputFormat(cars);
    this.validateSingleValue(cars);
  },

  validateInputFormat(cars) {
    cars.forEach(car => {
      if (car.length === 0 || car.includes(' ')) {
        throw new Error(ERROR.invalidFormat);
      }
    });
  },

  validateDuplicate(cars) {
    const copyArr = cars.filter(
      (car, index) => index === cars.lastIndexOf(car),
    );

    if (cars.length !== copyArr.length) {
      throw new Error(ERROR.duplicateValue);
    }
  },

  validateSingleValue(cars) {
    if (cars.length === 1) {
      throw new Error(ERROR.invalidSingleValue);
    }
  },
};

export default Validator;
