import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const createReadMachine = () => {
  const readMachine = readline.createInterface({ input, output });
  return readMachine;
};
