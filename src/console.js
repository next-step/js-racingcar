import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Car from "./Car.js";

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

export const makeCarObject = (cars, position) =>
  cars.map((name) => new Car(name, position));

export const goForward = (cars, predicate) => cars.map((car) => predicate(car));

export const printWithCarName = (carName, result) => `${carName}: ${result}`;

export const print = (cars, results) => {
  const newResult = cars.map((car, index) =>
    results.map((row) => row[index]).join(""),
  );

  cars.forEach((car, index) => {
    console.log(printWithCarName(car.getName(), newResult[index]));
  });

  return newResult;
};

export const race = (carObjs, gameCount) => {
  const goDirection = (car) => {
    const randomNumber = Math.floor(Math.random() * 3);

    if (car instanceof Car && randomNumber === 0) {
      car.goToX();
      return "X";
    }
    if (car instanceof Car && randomNumber === 1) {
      car.goToY();
      return "Y";
    }
    if (car instanceof Car && randomNumber === 2) {
      car.goToZ();
      return "Z";
    }

    throw new Error("이동할 수 없습니다.");
  };

  const carResults = Array.from({ length: gameCount }).reduce((gameResult) => {
    const results = goForward(carObjs, goDirection);

    gameResult.push(results);
    console.log("");
    print(carObjs, gameResult);
    console.log("");
    return gameResult;
  }, []);
  return carResults;
};

export const printExitMessage = (string) => {
  console.log(string);
};

export const play = async () => {
  const read = readline.createInterface({
    input,
    output,
  });

  const carName = await getCars(read);

  const cars = makeToArray(carName);

  checkCarNames(cars);

  const carObjs = makeCarObject(cars, { x: 0, y: 0, z: 0 });

  race(carObjs, 5);

  printExitMessage("경주를 완료했습니다.");

  read.close();
};
