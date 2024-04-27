import CONSTANTS from '../constants/Constants';
import ERROR from '../constants/Error';

const Validator = {
  validateUserInput(input) {
    if (input === CONSTANTS.emptyString) {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarNames(str) {
    if (str.length > CONSTANTS.car.maxNameLength) {
      throw new Error(ERROR.invalidNameLength);
    }
  },

  validateInputFormat(input) {
    const cars = input.map(car => car.name);

    this.validateDuplicate(cars);
  },

  validateDuplicate(cars) {
    const copyArr = cars.filter(
      (car, index) => index === cars.lastIndexOf(car),
    );

    if (cars.length !== copyArr.length) {
      throw new Error(ERROR.duplicateValue);
    }
  },
};

export default Validator;
