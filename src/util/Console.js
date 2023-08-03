import readline from "readline";

const addNewLine = (message) => `${message}\n`;

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const Console = {
  /** 한줄 입력 받기*/
  readLine(question, callback) {
    rl.question(addNewLine(question), (input) => {
      callback(input);
    });
  },
  /** 출력하기*/
  print(...message) {
    console.log(...message);
  },
};
