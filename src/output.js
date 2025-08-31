import { Racing } from "./racing.js";
import { Winner } from "./winner.js";

export function printResult(/** @type Racing */ racing) {
  console.log("\n실행 결과\n");
  for (let cycle = 0; cycle < racing.phase; cycle++) {
    racing.cars.value.forEach((car) => {
      printCarStatus(car.name, racing.history.get(car)[cycle]);
    });
    console.log("\n");
  }
}

export function printWinner(/** @type Winner */ winner) {
  const winnerList = winner.getCarNameList();
  console.log(`${winnerList}가 최종 우승했습니다.`);
}

function printCarStatus(name, position) {
  console.log(name, " : ", "-".repeat(position));
}
