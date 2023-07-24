import readline from 'readline';

export const getUserInputByQuestion = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question + '\n', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};
