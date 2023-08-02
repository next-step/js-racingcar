import { Console } from '../utils';

export const InputView = {
  readUserInput(message, userInputHandler) {
    Console.readLine(message, (userInput) => {
      userInputHandler(userInput);
    });
  },

  close() {
    Console.close();
  },
};
