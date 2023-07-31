import readline from 'readline';

export const queryLineInput = ({queryText, onLineInput}) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(queryText, line => {
    rl.close();
    onLineInput(line);
  });
};
