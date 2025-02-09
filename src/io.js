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
