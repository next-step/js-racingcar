import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const createReadMachine = () => {
  const readMachine = readline.createInterface({ input, output });
  return readMachine;
};

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

export const InputView = {
  async input(message) {
    const userInput = await getUserInput(message);
    return userInput;
  },
};
