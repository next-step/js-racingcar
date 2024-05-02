import { Racing } from "./domain/Racing.js";
import { readLineAsync } from "./util/readLine.js";

export const startRacing = (carNames) => {
  const race = new Racing(carNames.split(","));

  console.log("실행결과");
  while (race.currRound < race.maxRound) {
    race.gameRound();
    race.cars.forEach((car) => {
      console.log(`${car.name} : ${"-".repeat(car.position)}`);
    });
  }

  console.log(
    `${race.winner.map((car) => car.name).join(", ")}가 최종 우승했어요!`
  );

  return race;
};

// 입출력 예시
async function play() {
  const name = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
  );
  console.log(`${name}`);

  startRacing(name);
}

play();
