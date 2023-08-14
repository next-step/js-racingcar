import Car from "./Car";
import { isDuplicated } from "./utils/validator";
import { generateRandomNumber } from "./utils/generator";
import {
  printGameStart,
  printCurrentRound,
  printCurrentRoundResult,
  printWinners,
} from "./utils/print";
import { SEPARATOR, TOTAL_ROUND } from "./contants/racingGame";
import { ERROR_MSG } from "./contants/messages";

export default class RacingGame {
  #players;

  constructor() {}

  setPlayers(inputValue) {
    try {
      const names = inputValue.split(SEPARATOR);

      this.validateNames(names);

      this.#players = names.map((name) => {
        return new Car(name);
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  getPlayers() {
    return this.#players;
  }

  validateNames(names) {
    if (isDuplicated(names)) {
      throw new Error(ERROR_MSG.UINIQUE);
    }
  }

  start() {
    printGameStart();
    for (let round = 0; round < TOTAL_ROUND; round++) {
      this.playOneRound();
      printCurrentRound(round);
      printCurrentRoundResult(this.#players);
    }
  }

  playOneRound() {
    this.#players.forEach((player) => {
      const condition = generateRandomNumber();
      player.move(condition);
    });
  }

  getWinners() {
    const winners = this.determineWinners();
    printWinners(winners);
  }

  determineWinners() {
    const maxPosition = Math.max(
      ...this.#players.map((car) => car.getPosition()),
    );
    return this.#players.filter((car) => car.getPosition() === maxPosition);
  }
}
