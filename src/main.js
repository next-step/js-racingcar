import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";
import Validator from "./Validator.js";
import { CAR_RACE_CONFIG } from "./constants.js";
import Race from "./Race.js";
import { printRacingOutput } from "./output.js";

const play = async () => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question("경주할 자동차 이름을 입력하세요.");
  const carNameList = answer
    .split(CAR_RACE_CONFIG.INPUT_DIVIDER)
    .map((name) => name.toString().trim());

  try {
    carNameList.forEach((name) => Validator.carNameValidate(name));

    const carList = carNameList.map((name) => new Car(name));
    const race = new Race(
      carList,
      CAR_RACE_CONFIG.RACE_COUNT,
      CAR_RACE_CONFIG.DISTANCE_PER_MOVE
    );
    const raceResult = race.start();
    printRacingOutput(raceResult);
  } catch (error) {
    throw error;
  } finally {
    rl.close();
  }
};

play();
