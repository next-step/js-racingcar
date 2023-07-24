import { Console } from '../utils';

export const InputView = {
  readCarName(message, callback) {
    Console.readLine(message, (userInput) => {
      callback(userInput);
    });
  },
};
