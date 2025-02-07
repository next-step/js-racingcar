import readline from "readline";

function checkCarNameLengthOverLimit(names) {
  let isOverFive = false;

  const nameArr = names.split(",");

  nameArr.forEach((name) => {
    if (name.length > 5) {
      isOverFive = true;
      return;
    }
  });

  return isOverFive;
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
      }
      resolve(input);
    });
  });
}
