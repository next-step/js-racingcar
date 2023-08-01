import { createReadMachine } from '../utils/index.js';

const InputView = (function InputView() {
  const createUserInputByQuestion = async (message) => {
    const readMachine = createReadMachine();
    const userInput = await readMachine.question(message);
    readMachine.close();
    return userInput;
  };

  const getUserInput = async (message) => {
    const userInput = await createUserInputByQuestion(message);
    return userInput;
  };

  return {
    async input(message) {
      const userInput = await getUserInput(message);
      return userInput;
    },
  };
})();

export default InputView;
