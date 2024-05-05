import readline from "readline";

import { parseInput, getRandomNumber, parseOutput } from "./utils";

import { Car } from "../src/Car";
import { getWinners } from "./racing";

const LAPS = 5;
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

const readLineAsync = (query) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();

      try {
        const parsedInput = parseInput(input);
        resolve(parsedInput);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const play = async () => {
  try {
    const carNames = await readLineAsync("자동차 이름을 입력하세요 > ");
    const cars = carNames.map((name) => new Car(name));

    for (let i = 0; i < LAPS; i++) {
      cars.forEach((car) => {
        const randomNumber = getRandomNumber(RANDOM_MIN, RANDOM_MAX);
        car.move(randomNumber);
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
