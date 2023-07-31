import { Car } from "../Car/Car";
import { getRandomNumberInRange } from "../../util/getRandomNumber";
import { Console } from "../../util/Console";
import { RANDOM_MAX_NUMBER, RANDOM_MIN_NUMBER } from "./_consts";

export class RacingGame {
  #racingGameSize;
  #players;

  constructor() {
    this.#racingGameSize = 0;
    this.#players = [];
  }

  static readCarNamesInput() {
    return new Promise((resolve, _) => {
      Console.readLine(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).",
        (userInput) => {
          resolve(userInput);
        }
      );
    });
  }
  setRacingGameSize(racingGameSize) {
    this.#racingGameSize = racingGameSize;
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

  printOneRoundGameResult() {
    const result = this.#players
      .map((player) => player.getPositionLog())
      .join("\n");
    Console.print(result, "\n");
  }

  playGame() {
    Console.print("\n실행 결과");
    for (let round = 0; round < this.#racingGameSize; round++) {
      this.playOneRound();
      this.printOneRoundGameResult();
    }
    Console.print(this.getWinnerLog());
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
