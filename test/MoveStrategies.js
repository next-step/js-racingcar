import {
  StrategiesNotStringError,
  StrategyElementNotRorNumericError,
} from "./errors";
import RandomStrategy from "../src/Models/MoveStrategy/RandomStrategy";
import FixedStrategy from "./FixedStrategy";

export default class MoveStrategies {
  #strategies;

  constructor(str) {
    this.#strategies = [];

    this.#validateStrategies(str);

    Array.from(str).forEach((char) => {
      this.#strategies.push(this.#createStrategy(char));
    });

    return this.#strategies;
  }

  #validateStrategies(str) {
    if (typeof str !== "string") throw new StrategiesNotStringError();

    if (/[^0-9R]/.test(str)) throw new StrategyElementNotRorNumericError();
  }

  #createStrategy(char) {
    if (char === "R") return new RandomStrategy();
    return new FixedStrategy(Number(char));
  }
}
