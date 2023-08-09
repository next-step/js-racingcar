import * as readline from 'node:readline/promises';

export const getUserInputByQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl.question(question + '\n');
};
