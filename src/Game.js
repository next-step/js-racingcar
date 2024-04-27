import readline from "readline";

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

  constructor() {
    this.cars = [];
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

  setCar(cars) {
    if (!(cars instanceof Array)) {
      return false;
    }

    cars.forEach((car) => {
      this.cars.push(car);
    });

    return true;
  }
}
