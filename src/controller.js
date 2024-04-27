import { readLineAsync } from "./utils/readLineSync.js";
import Race from "./domain/Race.js";
import { displayForwardCar, displayRace } from "./View.js";

export async function askCarNames() {
  const carNames = await readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)"
  );

  console.log(carNames);
  console.log("");
  return carNames;
}

export function playGame(carNames) {
  try {
    const race = new Race(carNames.split(","));

    console.log(`실행 결과`);
    while (race.currentRound < race.maxRound) {
      race.playRound();
      displayRace(race.cars);
    }

    return race;
  } catch (error) {
    throw error;
  }
}
