import readline from "readline";

export function getRandomIntRangeOf(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
