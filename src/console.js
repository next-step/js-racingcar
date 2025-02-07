import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";

const play = async () => {
  const read = readline.createInterface({
    input,
    output,
  });

  // const instance = new Car();
  const carName = await read.question("경주할 자동차 이름을 입력하세요.");

  const cars = carName.split(",").map((val) => val.trim());
  console.log(cars);

  const isNameLessThanFive = cars.every((car) => car.length <= 5);

  if (isNameLessThanFive === false) {
    throw new Error("자동차 이름이 5자를 초과합니다.");
  }

  read.close();
};

export default play;
