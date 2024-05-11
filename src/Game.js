import { Car } from "./Car";

export const ERROR_CODE = {
  NO_VALUE: 1,
  INVALID_CAR_NAME: 2,
  DUPLICATE: 3,
};

export class Game {
  cars;
  playTime;
  #playLimit;

  constructor() {
    this.cars = [];
    this.playTime = 0;
  }

  getPlayLimit() {
    return this.#playLimit;
  }
  setPlayLimit(playLimit) {
    if (!playLimit) {
      console.log("숫자를 입력해주세요.");
      return false;
    }

    this.#playLimit = playLimit;

    return true;
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
      return carName.length > 5;
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
    while (this.playTime < this.#playLimit) {
      const isMoveArray = this.cars.map(() => {
        return this.#getRandomDistance();
      });

      isMoveArray.map((randomDistance, isMoveIndex) => {
        this.cars[isMoveIndex].move(randomDistance);

        let distanceString = "";
        for (let i = 0; i < this.cars[isMoveIndex].distance; i++) {
          distanceString += "-";
        }

        console.log(`${this.cars[isMoveIndex].name} : ${distanceString}`);
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
      max = Math.max(max, car.distance);
    });

    winner = this.cars.reduce((acc, car) => {
      if (car.distance === max) {
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
