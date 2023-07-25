const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default function inputCarNames() {
  return new Promise((resolve) => {
    readlineInterface.question("자동차의 이름을 입력해주세요.(각각의 이름은 콤마로 구분합니다.): ", (carNames) => {
      readlineInterface.close();
      resolve(carNames);
    });
  });
}
