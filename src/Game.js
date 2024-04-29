import readline from "readline";
import { Car } from "./Car";

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

export const ERROR_CODE = {
  NO_VALUE: 1,
  INVALID_CAR_NAME: 2,
};

export class Game {
  cars;
  playTime;

  constructor() {
    this.cars = [];
    this.playTime = 0;
  }

  /**
   * 터미널에서 입출력 받을 수 있게 하는 함수.
   * 제공받은 함수기 때문에 따로 뭐 하신 않으려고 함
   */
  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }

  getCarsByCarsString(carNamesString) {
    const carNames = carNamesString.split(",");
    console.log(carNames);

    if (!carNames || carNames[0] === "") {
      return ERROR_CODE.NO_VALUE;
    }

    for (let i = 0; i < carNames.length; i++) {
      if (carNames[i].length > 4) {
        return ERROR_CODE.INVALID_CAR_NAME;
      }
    }

    return carNames;
  }

  setCar(car) {
    if (!(car instanceof Car)) {
      return false;
    }

    this.cars.push(car);

    return true;
  }

  play() {
    if (this.playTime > 4) {
      const winners = this.getWinners();
      const winnerString = winners.reduce((acc, winner, i) => {
        acc += winner.name;
        if (i !== winners.length - 1) {
          acc += ", ";
        }
        return acc;
      }, "");

      console.log(`승자는 ${winnerString} 입니다`);
      return false;
    }

    let maxDistance = 0;
    let winCar = [];

    let max = -Infinity;
    this.cars.forEach((car) => {
      max = Math.max(max, car.winCount);
    });

    this.cars.reduce((acc, car) => {
      const randomDistance = this.#getRandomDistance();
      car.move(randomDistance);
      acc.push(car);

      if (car.distance >= max) {
        winCar.push(car);
        car.winCount += 1;
      }

      return acc;
    }, []);

    this.cars.forEach((car) => {
      let distanceString = "";
      for (let i = 0; i < car.distance; i++) {
        distanceString += "-";
      }
      console.log(`${car.name} : ${distanceString}`);

      car.distance = 0;
    });
    console.log("");

    this.playTime += 1;

    return true;
  }

  getWinners() {
    let winner = [];

    let max = -Infinity;
    this.cars.forEach((car) => {
      max = Math.max(max, car.winCount);
    });

    winner = this.cars.reduce((acc, car) => {
      if (car.winCount === max) {
        acc.push(car);
      }
      return acc;
    }, []);

    return winner;
  }

  #getRandomDistance() {
    return Math.floor(Math.random() * 10);
  }
}
