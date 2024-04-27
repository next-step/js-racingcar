import { readLineAsync } from "./utils/readLineSync.js";

export function displayInput(input) {
  console.log(input);
}

export async function askCarNames() {
  const carNames = await readLineAsync(
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)"
  );

  displayInput(carNames);
  console.log("");

  return carNames;
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
    `${race.winners.map((car) => car.name).join(", ")}가 최종 우승했습니다.`
  );
}
