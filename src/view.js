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

export function displayCarNames(carNames) {
  console.log(carNames);
  console.log("");
}

export function displayForwardCar(car) {
  console.log(`${car.name} : ${"-".repeat(car.position)}`);
}

export function displayRace(cars) {
  cars.forEach((car) => {
    displayForwardCar(car);
  });
  console.log("");
}

export function displayWinners(race) {
  console.log(
    `${race.winners.map((car) => car.name).join(", ")}${MESSAGE.WINNER}`
  );
}
