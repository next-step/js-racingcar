import { readLineAsync } from "./utils/readLineAsync.js";
import { printRacingCar, printWinners } from "./view/output.js";
import RacingGame from "../src/domain/RacingGame.js";
import RandomNumberRaceStrategy from "../src/domain/RandomNumberRaceStrategy.js";

async function play() {
  const name = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)\n"
  );

  const game = new RacingGame(
    await readLineAsync("시도할 회수는 몇회인가요?\n")
  );

  const cars = game.createRacingCars(name);

  // 경주 방식 선택
  const race = new RandomNumberRaceStrategy();

  console.log("\n실행 결과");
  for (let i = 0; i < game.getRacingTry(); i++) {
    cars.forEach((car) => {
      let movable = race.move();
      car.move(movable, car.getName());
      printRacingCar(car);
    });
    console.log();
  }

  const winners = game.getWinners(cars);
  printWinners(winners);
}

play();
