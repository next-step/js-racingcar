import Car from "./Car.js";
import { readLineAsync } from "./utils/readLineAsync.js";

function parseNames(input) {
  if (typeof input !== "string") {
    throw new Error("잘못 입력했습니다. 올바른 이름을 입력해주세요");
  }

  const names = input
    .split(",")
    .map((n) => n.trim())
    .filter((n) => n.length > 0);

  if (names.length === 0) {
    throw new Error("잘못 입력했습니다. 올바른 이름을 입력해주세요");
  }

  const CAR_NAME_MAX_LENGTH = 5;
  if (!names.every((name) => name.length <= CAR_NAME_MAX_LENGTH)) {
    throw new InvalidInputError("자동차 이름은 5자 이하만 가능합니다.");
  }

  return names;
}

function makeCars(carNames) {
  return carNames.map((name) => new Car({ name }));
}

function winnersOf(cars) {
  const maxPosition = Math.max(...cars.map((c) => c.position));
  return cars.filter((c) => c.position === maxPosition).map((c) => c.name);
}

export async function advancedCarGame({
  askInput = readLineAsync,
  resultConsole = console.log,
  random = Math.random,
} = {}) {
  try {
    const inputCarNames = await askInput(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분). : "
    );

    const carNames = parseNames(inputCarNames);

    const cars = makeCars(carNames);

    const inputGameCount = await askInput("시도할 회수는 몇회인가요?");
    const tryGameCount = Number(inputGameCount);

    for (let i = 0; i < tryGameCount; i++) {
      cars.forEach((car) => {
        if (Math.floor(random() * 10) >= 4) {
          car.moveForward();
        }

        resultConsole(`${car.name} : ${"-".repeat(car.position)} \n`);
      });
      resultConsole("\n");
    }

    const winners = winnersOf(cars);
    resultConsole(`${winners.join(" , ")} 가 최종 우승했습니다.`);
  } catch (error) {
    console.error(error);
  }
}

advancedCarGame();
