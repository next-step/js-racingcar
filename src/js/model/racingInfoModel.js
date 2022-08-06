import {
  MAX_NAME_LENGTH_LIMIT,
  RANDOM_NUM_MIN_RANGE,
  RANDOM_NUM_MAX_RANGE,
  STANDARD_MOVE_VALUE,
} from "../util/constants.js";

class RacingInfoModel {
  constructor() {
    this.entires = [];
    this.moveCount = 0;
    this.movingDistPerCar = [];
    this.racingWinner = [];
  }

  #generateRandomNum() {
    return Math.floor(Math.random() * (RANDOM_NUM_MAX_RANGE - RANDOM_NUM_MIN_RANGE)) + RANDOM_NUM_MIN_RANGE;
  }

  #canMove() {
    return this.#generateRandomNum() > STANDARD_MOVE_VALUE;
  }

  setEntries(entries) {
    this.entires = [];

    entries.forEach((entry) => {
      if (entry.length === 0) {
        throw new Error("자동차의 이름이 유효하지 않습니다");
      } else if (entry.length > MAX_NAME_LENGTH_LIMIT) {
        throw new Error("5자 이하의 이름만 입력해 주세요");
      }
      this.entires.push(entry);
    });

    this.movingDistPerCar = Array.from({ length: entries.length }, () => 0);
  }

  setMoveCount(count) {
    this.moveCount = count;
  }

  moveCars() {
    Array.from({ length: this.moveCount }, () => {
      this.entires.forEach((_, idx) => {
        if (this.#canMove()) {
          this.movingDistPerCar[idx] += 1;
        }
      });
    });

    Array.from({ length: this.moveCount }, (_, i) => {
      setTimeout(() => {
        this.entires.forEach((_, idx) => {
          console.log(this.entires[idx]);
        });
        console.log("~~~~~~~~~");
      }, 1000 * i);
    });
  }

  getRacingResult() {
    const maxDist = Math.max(...this.movingDistPerCar);
    this.racingWinner = this.entires.filter((_, idx) => this.movingDistPerCar[idx] === maxDist);
  }
}

export default new RacingInfoModel();
