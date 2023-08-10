import * as readline from 'node:readline/promises';

export const getUserInputByQuestion = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(question + '\n');

  rl.close();

  return answer;
};
