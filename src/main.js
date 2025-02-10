import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";
import Validator from "./Validator.js";

const play = async () => {
  const rl = readline.createInterface({ input, output });
  const name = await rl.question("경주할 자동차 이름을 입력하세요.");

  const carNameList = name.split(",");
  const carList = carNameList.map((name) => new Car(name));

  try {
    carList.forEach((car) => Validator.carNameValidate(car.name));
    carList.forEach((car) => console.log(`자동차 이름은 ${car.name}입니다. `));
  } catch (error) {
    throw error;
  } finally {
    rl.close();
  }
};

play();
