import { parserName } from "../utils/parser.js";

export function printRacingCar(car) {
  console.log(`${car.getName()}: ${"-".repeat(car.getPosition())}`);
}

export function printWinners(winners) {
  const winnersName = parserName(winners.map((i) => i.getName()));
  console.log(winnersName + "가 최종 우승했습니다.");
}
