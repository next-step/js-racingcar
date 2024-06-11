import { Racing } from "../domain/Racing.js";
import { generateCars } from "../domain/generateCars.js";
import { getWinnerCars } from "../domain/getWinnerCars.js";
import { readLineAsync } from "../util/readLine.js";

export const getInputCars = async () => {
  const carNames = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분) > "
  );
  console.log(`${carNames}`);

  try {
    const cars = generateCars(carNames);
    return cars;
  } catch (error) {
    console.log(error);
    return getInputCars();
  }
};

export const getMaxRound = async () => {
  const roundCount = await readLineAsync("시도할 회수는 몇회인가요? > ");
  console.log(`${roundCount}`);

  try {
    return parseInt(roundCount);
  } catch (error) {
    console.log(error);
    return getMaxRound();
  }
};

export const startRacing = (newCars, roundCount) => {
  const race = new Racing(newCars, roundCount);

  console.log("실행결과");
  const carHistories = race.gameStart();

  carHistories.forEach((cars) => {
    cars.forEach((car) => {
      console.log(`${car.name} : ${"-".repeat(car.position)}`);
    });
    console.log("");
  });
  const winner = getWinnerCars(race.cars);
  console.log(`${winner.map((car) => car.name).join(", ")}가 최종 우승했어요!`);
};
