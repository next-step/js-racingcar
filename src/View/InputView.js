import readLineAsync from '../utils/readLineAsync';
import Validator from '../utils/Validator';

const InputView = {
  async readlineAsync(message) {
    const userInput = await readLineAsync(message);

    Validator.validateUserInput(userInput);

    return userInput;
  },
};

export default InputView;
