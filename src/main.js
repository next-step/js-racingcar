import { readLineAsync } from "../src/getUserInput.js";
import Car from "../src/makeCar.js";

export default async function start() {
  const cars = [];
  await readLineAsync("경주할 자동차 이름을 입력하세요 : ").then((name) => {
    const nameArr = name.split(",");

    nameArr.forEach((name, index) => {
      cars.push(new Car(name));
    });
  });

  return cars;
}

// await start();
