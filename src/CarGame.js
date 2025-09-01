import { readLineAsync } from "./utils/readLineAsync";

function checkCarName(names) {
  const CAR_NAME_MAX_LENGTH = 5;
  return names.every((name) => name.length <= CAR_NAME_MAX_LENGTH);
}

function moveForwardOneTime(carName, position, logging) {
  logging(`${carName} : ${"-".repeat(position)} \n`);
}

export async function playCarGame({
  askInput = readLineAsync,
  resultConsoleLog = console.log,
} = {}) {
  try {
    const input = await askInput("자동차 이름을 입력하세요 > ");

    const carNames = input.split(",");

    if (!checkCarName(carNames)) return;

    const GAME_COUNT = 5;

    resultConsoleLog("실행 결과");

    for (let i = 1; i <= GAME_COUNT; i++) {
      for (let car of carNames) {
        moveForwardOneTime(car, i, resultConsoleLog);
      }
    }

    resultConsoleLog("경주를 완료했습니다.");
  } catch (error) {
    console.error(`입력 오류 : ${error?.message ?? error}`);
  }
}
