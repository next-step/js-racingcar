import readline from 'readline';

export const getLineInput = callbackUserInput => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', line => {
    rl.close();
    callbackUserInput(line);
  });
};
