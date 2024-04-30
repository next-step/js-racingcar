import CarRace from "./domain/CarRace.js";
import { createCars } from "./utils/cars.js";
import { readLineAsync } from "./utils/io.js";

async function play() {
  const input = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
  );
  console.log("\n실행결과");

  try {
    // 자동차 생성
    const cars = createCars(input);

    // 자동차 경주 횟수 입력
    const carRaceTotalCount = await CarRace.getTotalRaceCountUntilValid();

    // 자동차 경주 생성
    const carRace = new CarRace(cars, carRaceTotalCount);

    // 자동차 경주 시작
    carRace.race();

    // 우승자 출력
    carRace.printWinners();
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

play();
