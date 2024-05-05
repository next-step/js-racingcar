import IO from "./IO";
import Car from "../src/Car";

import { parseCarNames, parseLaps, parseOutput } from "./utils";
import { createCars, executeLap, getWinners } from "./racing";

const play = async () => {
  const carNamesInput = await IO.readLineAsync("자동차 이름을 입력해주세요");
  const lapsInput = await IO.readLineAsync("시도할 회수는 몇회인가요?");

  try {
    const carNames = parseCarNames(carNamesInput);
    const laps = parseLaps(lapsInput);
    const cars = createCars(carNames, Car);

    for (let i = 0; i < laps; i++) {
      console.log(`Lap #${i + 1} ${"=".repeat(50)}`);
      executeLap(cars);
    }

    const winners = getWinners(cars);
    const parsedWinners = parseOutput(winners);

    console.log(`${parsedWinners}가 최종 우승했습니다.`);
  } catch (error) {
    console.error(error.message);
  }
};

play();
