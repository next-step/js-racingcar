import { Console } from '../utils';
import { MESSAGE } from '../constants';

export const InputView = {
  readCarNames(callback) {
    Console.readLine(MESSAGE.CONSOLE.READ.CAR_NAME, (userInput) => {
      callback(userInput);
    });
  },
};
