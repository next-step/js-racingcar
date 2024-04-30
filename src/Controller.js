import { Round } from "../src/domain/Round";
import { Car } from "../src/domain/Car";

export class Controller {
  baseRound;
  rounds = [];

  constructor() {}

  init(input) {
    this.isNotString(input);
    const carNames = input.split(",");
    this.baseRound = this.createBaseRound(carNames);
  }

  createBaseRound(carNames) {
    const cars = carNames.map((e) => new Car(e));
    return new Round(cars);
  }

  play(roundTimes) {
    this.isVaildRoundTimes(roundTimes);

    for (let i = 0; i < roundTimes; i++) {
      const round = this.loadLastRound();
      round.play();
      this.rounds.push(round);
    }
  }

  loadLastRound() {
    if (this.rounds.length === 0) {
      return this.baseRound;
    }

    return this.rounds.at(-1).copy();
  }

  isNotString(input) {
    if (typeof input !== "string") {
      throw new Error("잘못된 입력입니다.");
    }
  }

  isVaildRoundTimes(roundTimes) {
    if (!Number.isInteger(roundTimes)) {
      throw new Error();
    }

    if (roundTimes <= 0) {
      throw new Error();
    }
  }

  get winners() {
    const winners = this.rounds.at(-1).winners;
    return winners.map((e) => e.name);
  }
}
