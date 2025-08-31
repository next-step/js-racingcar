import { Racing } from "./racing.js";

export function printResult(/** @type Racing */ racing) {
  console.log("\n실행 결과\n");
  for (let cycle = 0; cycle < racing.phase; cycle++) {
    racing.carList.forEach((car) => {
      printCarStatus(car.name, racing.history.get(car)[cycle]);
    });
  }
  printFinish();
}

function printCarStatus(name, position) {
  console.log(name, " : ", "-".repeat(position), "\n");
}

function printFinish() {
  console.log("경주를 완료했습니다.");
}
