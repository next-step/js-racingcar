import * as readline from 'node:readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getUserInputByQuestion = (question) => {
  return rl.question(question + '\n');
};
