import RacingGame from "./RacingGame";
import Car from "./Car";
import InputCarNames from "./InputCarNames";

const main = () => {
  const readline = require("readline");

  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  r1.question("경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n", (names) => {
    const nameList = InputCarNames(names);
    if (typeof nameList === "string") {
      console.log(nameList);
      return r1.close();
    }

    const cars = nameList.map(($name) => new Car($name));
    RacingGame(cars);

    r1.close();
  });
};

main();
