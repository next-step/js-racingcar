import { readLineAsync } from "./utils/readLineSync.js";
import { MESSAGE } from "./constant/index.js";

export function displayInput(input) {
  console.log(input);
}

export async function askCarNames() {
  return await readLineAsync(MESSAGE.ASK_CAR_NAMES);
}

export async function askMaxRound() {
  const maxRound = await readLineAsync(MESSAGE.ASK_MAX_ROUND);

  displayInput(maxRound);
  console.log("");

  return maxRound;
}

export function displayForwardCar(car) {
  console.log(`${car.name} : ${"-".repeat(car.position)}`);
}

export function displayRaceRecords(records) {
  records.forEach((car) => displayForwardCar(car));
  console.log("");
}

export function displayWinners(winners) {
  console.log(`${winners.map((car) => car.name).join(", ")}${MESSAGE.WINNER}`);
}
