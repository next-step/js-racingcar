import readline from "readline";
import { ArgumentError } from "../common/error.js";

const READLINE_TYPE_ERROR = "query must be string";
const READLINE_ARGUMENT_ERROR = "arguments must be 1";

export class ReadLineTypeError extends TypeError {
  constructor() {
    super(READLINE_TYPE_ERROR);
  }
}

export class ReadLineArgumentError extends ArgumentError {
  constructor() {
    super(READLINE_ARGUMENT_ERROR);
  }
}

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new ReadLineArgumentError());
    }

    if (typeof query !== "string") {
      reject(new ReadLineTypeError());
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
