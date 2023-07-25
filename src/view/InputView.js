import { INPUT_MESSAGE } from '../constants/index.js';
import Validator from '../Validator.js';
import { convertStringToArray, createReadMachine } from '../utils/index.js';
import OutputView from './OutputView.js';

const InputView = (function InputView() {
  const createUserInputByQuestion = async (message) => {
    const readMachine = createReadMachine();
    const userInput = await readMachine.question(message);
    readMachine.close();
    return userInput;
  };

  const getUserInput = async (message) => {
    try {
      const userInput = await createUserInputByQuestion(message);
      Validator.check(userInput, message);
      return userInput;
    } catch (error) {
      OutputView.print(error.message);
      return getUserInput(message);
    }
  };

  const processUserInput = (userInput, message) => {
    switch (message) {
      case INPUT_MESSAGE.RACING_CAR:
        return convertStringToArray(userInput, ',');
      default:
        return userInput;
    }
  };

  return {
    async input(message) {
      const userInput = await getUserInput(message);
      return processUserInput(userInput, message);
    },
  };
})();

export default InputView;
