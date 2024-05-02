import { readLineAsync, readIntegerAsync } from "../common/ReadLine";

export class View {
  start() {
    const input = readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
    );
    return input;
  }

  roundTimes() {
    const input = readIntegerAsync("시도할 회수는 몇회인가요?");
    return input;
  }

  result(rounds) {
    console.log("\n실행 결과");

    for (const round of rounds) {
      for (const car of round.cars) {
        console.log(`${car.name} : ${"-".repeat(car.position)}`);
      }
      console.log("");
    }
  }

  end(winners) {
    console.log(`${winners.join(", ")}가 최종 우승했습니다.`);
  }

  print(message) {
    console.log(message);
  }

  error(message) {
    console.log(`${message}, 다시 입력해주세요.`);
  }
}
