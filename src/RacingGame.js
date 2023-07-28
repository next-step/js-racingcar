import { Car } from "./Car";
import { getRandomNumberInRange } from "./util/getRandomNumber";

export const RANDOM_MIN_NUMBER = 0;
export const RANDOM_MAX_NUMBER = 9;

export class RacingGame {
  #racingGameSize;
  #player;

  constructor(racingGameSize, carName) {
    this.#racingGameSize = racingGameSize;
    this.#player = new Car(carName);
  }

  getPlayer() {
    return this.#player;
  }

  getRandomNumberToRun() {
    return getRandomNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER);
  }

  playOneRound(player, randomNumber) {
    player.run(randomNumber);
  }

  playGame(player, racingGameSize) {
    for (let round = 0; round < racingGameSize; round++) {
      this.playOneRound(player, this.getRandomNumberToRun());
    }
  }

  getWinner(player) {
    return player;
  }
}
