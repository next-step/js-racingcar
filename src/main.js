import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";

const play = async () => {
  const rl = readline.createInterface({ input, output });
  const name = await rl.question("경주할 자동차 이름을 입력하세요.");

  const car = new Car(name);

  rl.close();
  console.log(`자동차 이름은 ${car.name}입니다. `);
};

play();
