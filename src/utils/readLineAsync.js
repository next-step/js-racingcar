import readline from "readline";
import { InputError } from "../domain/Error";

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new InputError("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new InputError("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}
