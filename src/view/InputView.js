import { getUserInputByQuestion, processUserInput } from '../utils/view.js';

const InputView = {
  async input(message) {
    const userInput = await getUserInputByQuestion(message);
    return processUserInput(userInput, message);
  },
};

export default InputView;
