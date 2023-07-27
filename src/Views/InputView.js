import { Console } from '../utils';

export const InputView = {
  readCarName(message, userInputHandler) {
    Console.readLine(message, (userInput) => {
      userInputHandler(userInput);
    });
  },
};
