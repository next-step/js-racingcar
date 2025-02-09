import { readLineAsync } from "./getUserInput.js";

export default class Car {
  constructor(name) {
    this.name = name;
    this.state = 0;
  }
  go() {
    this.state += 1;
    return;
  }
}

export async function makeCar() {
  const cars = [];
  await readLineAsync("경주할 자동차 이름을 입력하세요 : ").then((name) => {
    const nameArr = name.split(",");

    nameArr.forEach((name, index) => {
      cars.push(new Car(name));
    });
  });

  return cars;
}
