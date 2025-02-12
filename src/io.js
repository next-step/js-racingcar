import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

export const getCarNamesFromInput = async (readline) => {
  const line = await readline.question(
    "경주할 자동차 이름을 입력하세요 (이름은 쉼표(,)를 기준으로 구분).\n"
  );

  const names = line.split(",");

  return names;
};

export const getTrialCountFromInput = async (readline) => {
  const line = await readline.question("시도할 회수는 몇회인가요?\n");

  const trial = Number(line.trim());

  if (!Number.isInteger(trial) || trial <= 0) {
    throw new Error("시도 횟수는 1 이상의 정수여야 합니다.");
  }

  return trial;
};

export const printRacingGameResult = (racingGame) => {
  console.log("\n실행 결과");

  const raceIterator = racingGame.startRace();

  for (const roundResult of raceIterator) {
    printCarPositions(roundResult);
  }

  const winners = racingGame.getWinners();

  console.log(`${winners.join(", ")}가 최종 우승했습니다.`);
};

const printCarPositions = (cars) => {
  for (const { name, position } of cars) {
    console.log(`${name} : ${"-".repeat(position)}`);
  }
  console.log("");
};
