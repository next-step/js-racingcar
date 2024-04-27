import CONSTANTS from '../constants/Constants';
import ERROR from '../constants/Error';

const Validator = {
  validateUserInput(input) {
    if (input === CONSTANTS.emptyString) {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarNames(input) {
    if (input.length > CONSTANTS.car.maxNameLength) {
      throw new Error(ERROR.invalidNameLength);
    }
  },
};

export default Validator;
