import { Car } from "./Car";
import { getRandomNumberInRange } from "./util/getRandomNumber";

export const RANDOM_MIN_NUMBER = 0;
export const RANDOM_MAX_NUMBER = 9;

export class RacingGame {
  #racingGameSize;
  #players;

  constructor(racingGameSize, carNameInputs) {
    this.#racingGameSize = racingGameSize;
    this.setPlayers(this.getPlayerNamesFromInput(carNameInputs));
  }

  getPlayers() {
    return this.#players;
  }

  getPlayerNamesFromInput(inputValue) {
    return inputValue.split(",");
  }

  setPlayers(carNames) {
    this.#players = carNames.map((carName) => new Car(carName));
  }

  playerPlayOneRound(playerIdx, randomNumber) {
    // 인자만 알면 충분히 예측 가능한 결과. (테스트 가능)
    this.#players[playerIdx].run(randomNumber);
  }

  getRandomNumberToRun() {
    return getRandomNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER);
  }

  playOneRound() {
    for (let playerIdx = 0; playerIdx < this.#players.length; playerIdx++) {
      this.playerPlayOneRound(playerIdx, this.getRandomNumberToRun());
    }
  }
  playGame(racingGameSize) {
    //getRandomNumberToRun()의 결과값이 난수이기 때문에 테스트 불가..?
    for (let round = 0; round < racingGameSize; round++) {
      this.playOneRound();
    }
  }

  getWinnerPosition() {
    return Math.max(...this.#players.map((player) => player.getPosition()));
  }

  getWinners() {
    const winnerPosition = this.getWinnerPosition();
    return this.#players.filter(
      (player) => player.getPosition() === winnerPosition
    );
  }

  getWinnersNames() {
    const winners = this.getWinners();
    return winners.map((winner) => winner.getName());
  }

  getWinnerLog() {
    return `${this.getWinnersNames().join(",")}가 최종 우승했습니다.`;
  }
}
