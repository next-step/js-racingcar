import { Round } from "../src/domain/Round";
import { Car } from "../src/domain/Car";

export class Controller {
  carNames;
  rounds = [];

  constructor() {}

  init(input) {
    this.validate(input);
    this.carNames = input.split(",");
  }

  play(roundTimes) {
    for (let i = 0; i < roundTimes; i++) {
      const round = this.loadLastRound();
      round.play();
      this.rounds.push(round);
    }
  }

  loadLastRound() {
    if (this.rounds.length === 0) {
      const cars = this.carNames.map((e) => new Car(e));
      return new Round(cars);
    }
    return new Round(this.rounds.at(-1).cars);
  }

  validate(input) {
    if (typeof input !== "string") {
      throw new Error("잘못된 입력입니다.");
    }

    if (input === "") {
      throw new Error("잘못된 입력입니다.");
    }

    const split = input.split(",");

    if (split.includes("")) {
      throw new Error("잘못된 입력입니다.");
    }

    if (split.length !== new Set(split).size) {
      throw new Error("잘못된 입력입니다.");
    }
  }

  get carNames() {
    return [...this.carNames];
  }
}
