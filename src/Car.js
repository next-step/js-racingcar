import readline from "readline";

// 자동차 이름 길이 체크
const checkCarNameLength = (carName) => {
  return carName.length <= 5;
};

// 자동차 이름 체크
const checkCarName = (carName) => {
  const carNames = carName.split(",");

  if (Array.isArray(carNames) && carNames.every(checkCarNameLength)) {
    return carNames;
  }

  if (typeof carNames === "string" && checkCarNameLength(carNames)) {
    return carNames;
  }

  return false;
};

// 사용자 입력 비동기 처리 함수
function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
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
      const removeSpacesCarNames = input.replace(/ /g, "");
      const correctCarNames = checkCarName(removeSpacesCarNames);

      if (correctCarNames) {
        resolve(correctCarNames);
      }
    });
  });
}

// 게임 시작
const play = async () => {
  const carNames = await readLineAsync("경주할 자동차 이름을 입력하세요. > ");
  console.log(carNames);
};

play();
