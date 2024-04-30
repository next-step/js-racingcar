import { readLineAsync } from "./utils/readLineSync.js";
import { MESSAGE } from "./constant/index.js";

export function displayInput(input) {
  console.log(input);
}

export async function askCarNames() {
  const carNames = await readLineAsync(MESSAGE.ASK_CAR_NAMES);

  displayInput(carNames);
  console.log("");

  return carNames;
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
