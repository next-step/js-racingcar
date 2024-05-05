import IO from "./IO";
import Car from "../src/Car";

import { parseInput, parseOutput } from "./utils";
import { createCars, executeLap, getWinners } from "./racing";

const LAPS = 5;

const play = async () => {
  const input = await IO.readLineAsync("자동차 이름을 입력해주세요");

  try {
    const carNames = parseInput(input);
    const cars = createCars(carNames, Car);

    for (let i = 0; i < LAPS; i++) {
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
