import readline from 'readline';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const Console = {
  readLine(question, callback) {
    rl.question(question, (input) => {
      callback(input);
      rl.close();
    });
  },
  print(message) {
    console.log(message);
  },
};
