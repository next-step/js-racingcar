import readline from "readline";

const MIN_LENGTH = 1;

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== MIN_LENGTH) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
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

export default readLineAsync;
