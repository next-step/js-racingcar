import readLineAsync from '../utils/readLineAsync';

const InputView = {
  async readlineAsync(message) {
    const userInput = await readLineAsync(message);

    return userInput;
  },
};

export default InputView;
