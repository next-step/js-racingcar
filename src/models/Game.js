import readlineSync from "readline-sync";

import Race from "./Race";
import { ERROR_MESSAGE, NUMBER_OF_MATCHES, ZERO } from "../constants";

export class Game {
  totalMatches;
  race;
  constructor() {
    this.totalMatches = NUMBER_OF_MATCHES;
    this.race = new Race();
  }

  start() {
    const names = this.getNames();
    if (names.length === 0) {
      throw new Error(ERROR_MESSAGE.LACK_OF_MINIMUM_CARS);
    }
    this.race.setCars(...names);

    Array.from({ length: this.totalMatches }, () => this.race.startRound());

    this.printWinners();
  }

  getNames() {
    const names = readlineSync
      .question(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
      )
      .split(",");
    return names;
  }

  getResult() {
    const maxPosition = Math.max(...this.race.cars.map((car) => car.position));
    return this.race.cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }

  printWinners() {
    const result = this.getResult();
    if (result.length > 0) {
      const winners = this.getResult().join(", ");
      console.log(`${winners}가 최종 우승했습니다.`);
    } else {
      console.log("우승자가 없습니다.");
    }
  }
}

export default Game;
