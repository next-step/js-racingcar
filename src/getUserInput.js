import readline from "readline";

function checkCarNameLengthOverLimit(names) {
  const nameArr = names.split(",").map((name) => name.trim());

  return nameArr.some((name) => name.length > 5);
}

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (checkCarNameLengthOverLimit(input)) {
        reject(new Error("차 이름은 5글자 이하만 가능합니다."));
        return;
      }
      resolve(input);
    });
  });
}

export function getRaceCount(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (Number.isNaN(Number(input))) {
        reject(new Error("횟수는 숫자만 입력가능합니다."));
        return;
      }
      resolve(input);
    });
  });
}
