import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const createReadlineInterface = () => {
  return readline.createInterface({ input, output });
};

export const getCarNamesFromInput = async (readline) => {
  const line = await readline.question("경주할 자동차 이름을 입력하세요.\n");

  const names = line.split(",");

  return names;
};

export const printRacingGameResult = (racingGame) => {
  console.log("\n실행 결과");

  for (const result of racingGame) {
    printCarPositions(result);
  }

  console.log("경주를 완료했습니다.");
};

const printCarPositions = (cars) => {
  for (const { name, position } of cars) {
    console.log(`${name} : ${"-".repeat(position)}`);
  }
  console.log("");
};
