import ERROR from '../constants/Error';

const Validator = {
  validateUserInput(input) {
    if (input === '') {
      throw new Error(ERROR.emptyInput);
    }
  },
};

export default Validator;
