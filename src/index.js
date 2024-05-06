import { readLineAsync } from "./utils/readLineAsync.js";
import { printRacingCar, printWinners } from "./view/output.js";
import { generateRandomNumber } from "./utils/GeneratorNumber.js";
import RacingGame from "../src/domain/RacingGame.js";

async function play() {
  // 사용자가 자동차 이름 입력
  const name = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)\n"
  );

  // 사용자가 경주 횟수 지정 후 racing 객체 생성
  const game = new RacingGame(
    await readLineAsync("시도할 회수는 몇회인가요?\n")
  );

  // 자동차 리스트 생성
  const cars = game.createRacingCars(name);

  // 자동차 경주 시작
  console.log("\n실행 결과");
  for (let i = 0; i < game.getRacingTry(); i++) {
    cars.forEach((car) => {
      let isMove = game.isValidMove(generateRandomNumber());
      car.move(isMove);
      printRacingCar(car);
    });
    console.log();
  }

  // 우승자 출력
  const winners = game.getWinners(cars);
  printWinners(winners);
}

play();
