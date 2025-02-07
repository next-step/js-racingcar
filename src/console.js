import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";

export const GAME_COUNT = 1;

export const makeToArray = (string) =>
  string.split(",").map((val) => val.trim());

export const isNameLessThanFive = (items) =>
  items.every((item) => item.length <= 5);

export const getCars = async (read) => {
  const carName = await read.question("경주할 자동차 이름을 입력하세요.");
  return carName;
};

export const checkCarNames = (cars) => {
  if (isNameLessThanFive(cars) === false) {
    throw new Error("자동차 이름이 5자를 초과합니다.");
  }
};

export const makeCarObject = (cars) => cars.map((name) => new Car(name));

export const goForward = (cars, position) => {
  cars.forEach((car) => {
    if (position === "x") {
      car.goToX();
    }
  });
};

export const race = (carObjs) => {
  Array.from({ length: GAME_COUNT }).forEach((_, index) => {
    console.log(`반복 ${index + 1}`);

    goForward(carObjs, "x");
  });
};

export const play = async () => {
  const read = readline.createInterface({
    input,
    output,
  });

  const carName = getCars(read);

  const cars = makeToArray(carName);

  checkCarNames(cars);

  // const instance = new Car();
  const carObjs = makeCarObject(cars);

  race(carObjs);

  read.close();
};
