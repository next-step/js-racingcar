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

  playOneRound(randomNumber) {
    // 인자만 알면 충분히 예측 가능한 결과. (테스트 가능)
    this.#player.run(randomNumber);
  }

  playGame(racingGameSize) {
    //getRandomNumberToRun()의 결과값이 난수이기 때문에 테스트 불가..?
    for (let round = 0; round < racingGameSize; round++) {
      this.playOneRound(this.getRandomNumberToRun());
    }
  }

  getWinner() {
    return this.#player;
  }

  getWinnerLog() {
    return `${this.getWinner().getName()}가 최종 우승했습니다.`;
  }
}
