import Car from "../src/Car";

import { parseCarNames, parseLaps, parseOutput, prompt } from "./utils";
import { createCars, executeLap, getWinners } from "./racing";

const play = async () => {
  try {
    const carNames = await prompt("경주할 자동차 이름을 입력해주세요.(쉼표(,)를 기준으로 구분)", {
      parse: parseCarNames,
    });
    const laps = await prompt("시도할 횟수는 몇회인가요?", { parse: parseLaps });

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
