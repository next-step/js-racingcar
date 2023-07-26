const readline = require("readline");

export const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const createRandomValue = () => {
  return Math.floor(Math.random() * 10);
};
