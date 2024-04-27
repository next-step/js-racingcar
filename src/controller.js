import { readLineAsync } from "./utils/readLineSync.js";
import Race from "./domain/Race.js";

export async function askCarNames() {
  const carNames = await readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)"
  );

  console.log(carNames);
  return carNames;
}

export function playGame(carNames) {
  const race = new Race(carNames.split(","));

  return race;
}
