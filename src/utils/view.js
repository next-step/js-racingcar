import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { INPUT_MESSAGE } from '../constants/index.js';
import Validator from '../Validator.js';
import { convertStringToArray } from './commons.js';
import OutputView from '../view/OutputView.js';

export const createUserInputByQuestion = async (message) => {
  const readMachine = readline.createInterface({ input, output });
  const userInput = await readMachine.question(message);
  readMachine.close();
  return userInput;
};

export const getUserInputByQuestion = async (message) => {
  try {
    const userInput = await createUserInputByQuestion(message);
    Validator.check(userInput, message);
    return userInput;
  } catch (error) {
    OutputView.print(error.message);
    return getUserInputByQuestion(message);
  }
};

export const processUserInput = (userInput, message) => {
  switch (message) {
    case INPUT_MESSAGE.RACING_CAR:
      return convertStringToArray(userInput, ',');
    default:
      return userInput;
  }
};
