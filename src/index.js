import CarRace from "./domain/CarRace.js";
import View from "./domain/View.js";
import Car from "./domain/Car.js";

async function play() {
  // 자동차 이름 입력
  const carNames = await View.getCarNamesFromUserInput();

  // 자동차 이름으로부터 자동차 생성
  const cars = Car.createCarsFromCarNames(carNames);

  // 자동차 경주 횟수 입력
  const totalRaceCount = await View.getTotalRaceCountFromUserInput();

  console.log("\n실행 결과");

  // 자동차 경주 생성
  const carRace = new CarRace(cars, totalRaceCount);

  // 자동차 경주 시작
  carRace.race();

  // 우승자 출력
  View.printCarRaceWinners(carRace.winners);
}

play();
