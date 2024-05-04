import { Round } from "./Round";
import { Car } from "./Car";

export class Controller {
  #baseRound;
  #rounds = [];

  constructor() {}

  init(input) {
    this.#checkInput(input);
    const carNames = input.split(",");
    this.#baseRound = this.#createBaseRound(carNames);
  }

  play(roundTimes) {
    this.#checkRoundTimes(roundTimes);

    for (let i = 0; i < roundTimes; i++) {
      const round = this.#loadLastRound();
      round.play();
      this.#rounds.push(round);
    }
  }

  #createBaseRound(carNames) {
    const cars = carNames.map((e) => new Car(e));
    return new Round(cars);
  }

  #loadLastRound() {
    if (this.#rounds.length === 0) {
      return this.#baseRound;
    }

    return this.#rounds.at(-1).copy();
  }

  #checkInput(input) {
    if (typeof input !== "string") {
      throw new Error("잘못된 입력입니다.");
    }
  }

  #checkRoundTimes(roundTimes) {
    if (!Number.isInteger(roundTimes)) {
      throw new Error();
    }

    if (roundTimes <= 0) {
      throw new Error();
    }
  }

  get baseRound() {
    return this.#baseRound;
  }

  get rounds() {
    return this.#rounds;
  }

  get winners() {
    const winners = this.#rounds.at(-1).winners;
    return winners.map((e) => e.name);
  }
}
