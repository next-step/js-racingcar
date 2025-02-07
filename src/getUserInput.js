import readline from "readline";

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length >= 5) {
      reject(new Error("차의 이름은 5글자 이하 여야합니다."));
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
