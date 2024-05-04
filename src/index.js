import CarRace from "./domain/CarRace.js";
import Car from "./domain/Car.js";
import IO from "./view/IO.js";

async function play() {
  // 자동차 이름 입력
  const carNames = await IO.getCarNamesFromUserInput();

  // 자동차 이름으로부터 자동차 생성
  const cars = Car.createCarsFromCarNames(carNames);

  // 자동차 경주 횟수 입력
  const totalRaceCount = await IO.getTotalRaceCountFromUserInput();

  // 자동차 경주 생성
  const carRace = new CarRace(cars, totalRaceCount);

  // 자동차 경주 시작
  carRace.race();

  // 자동차 경주 라운드 결과 출력
  IO.printCarRaceRoundsResult(carRace);

  // 자동차 경주 우승자 출력
  IO.printCarRaceWinners(carRace.winnerNames.join(", "));
}

play();
