import readline from "readline";
import { Car } from "./Car";

export const PLAY_TIME = 4;

export const ERROR_CODE = {
  NO_VALUE: 1,
  INVALID_CAR_NAME: 2,
  DUPLICATE: 3,
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

    const isNoValueCarName = carNames.some((carName) => {
      return !carName || carName === "";
    });
    if (isNoValueCarName) {
      return ERROR_CODE.NO_VALUE;
    }

    const isInvalidCarName = carNames.some((carName) => {
      return carName.length > 4;
    });
    if (isInvalidCarName) {
      return ERROR_CODE.INVALID_CAR_NAME;
    }

    const isDuplicateCarName = carNames.length !== new Set(carNames).size;
    if (isDuplicateCarName) {
      return ERROR_CODE.DUPLICATE;
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
    while (this.playTime < PLAY_TIME) {
      this.cars.map((car) => {
        const randomDistance = this.#getRandomDistance();
        car.move(randomDistance);
      });

      let max = -Infinity;
      this.cars.forEach((car) => {
        max = Math.max(max, car.distance);
      });

      this.cars.map((car) => {
        const randomDistance = this.#getRandomDistance();
        car.move(randomDistance);

        if (car.distance >= max) {
          car.win();
        }
      });

      this.cars.map((car) => {
        let distanceString = "";
        for (let i = 0; i < car.distance; i++) {
          distanceString += "-";
        }
        console.log(`${car.name} : ${distanceString}`);

        car.distance = 0;
      });
      console.log("");

      this.playTime += 1;
    }

    const winners = this.getWinners();
    const winnerString = winners.reduce((acc, winner, i) => {
      acc += winner.name;
      if (i !== winners.length - 1) {
        acc += ", ";
      }
      return acc;
    }, "");

    console.log(`승자는 ${winnerString} 입니다`);

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
