import readLineAsync from '../utils/readLineAsync.js';
import Validator from '../utils/Validator.js';

const InputView = {
  async readlineAsync(message) {
    const userInput = await readLineAsync(message);

    Validator.validateUserInput(userInput);

    return userInput;
  },
};

export default InputView;
