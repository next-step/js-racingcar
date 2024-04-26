import readline from "readline";
import { splitStringByComma } from "./utils/IO.js";
import CarRace from "./domain/CarRace.js";
import { printCarRaceWinners, raceMultipleTimes } from "./utils/carRace.js";
import { createCarsByNames, validateCarNames } from "./utils/car.js";

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${query}\n`, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

const TOTAL_RACE_COUNT = 5;

async function play() {
  const input = await readLineAsync(
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
  );
  console.log("\n실행결과");

  // input 유효성 검사
  validateCarNames(input);

  // 자동차 생성
  const carNames = splitStringByComma(input);
  const cars = createCarsByNames(carNames);

  // 자동차 경주 생성
  const carRace = new CarRace(cars);

  // 자동차 경주 시작
  raceMultipleTimes(carRace, TOTAL_RACE_COUNT);

  // 우승자 출력
  printCarRaceWinners(carRace);
}

play();
