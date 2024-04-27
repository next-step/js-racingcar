import CONSTANTS from '../constants/Constants';
import ERROR from '../constants/Error';

const Validator = {
  validateUserInput(input) {
    if (input === '') {
      throw new Error(ERROR.emptyInput);
    }
  },

  validateCarNames(input) {
    if (input.length > CONSTANTS.car.nameLength) {
      throw new Error(ERROR.invalidNameLength);
    }
  },
};

export default Validator;
