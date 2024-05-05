import IO from "./IO";
import Car from "../src/Car";

import { parseInput, getRandomNumber, parseOutput } from "./utils";
import { createCars, getWinners } from "./racing";

const LAPS = 5;
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

const play = async () => {
  const input = await IO.readLineAsync("자동차 이름을 입력해주세요");

  try {
    const carNames = parseInput(input);
    const cars = createCars(carNames, Car);

    for (let i = 0; i < LAPS; i++) {
      cars.forEach((car) => {
        const randomNumber = getRandomNumber(RANDOM_MIN, RANDOM_MAX);
        car.move(randomNumber);
        console.log(`${car.name} / ${car.position}`);
      });
    }

    const winners = getWinners(cars);
    const parsedWinners = parseOutput(winners);

    console.log(`${parsedWinners}가 최종 우승했습니다.`);
  } catch (error) {
    console.error(error.message);
  }
};

play();
