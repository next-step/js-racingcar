import { Car } from "../Car/Car";
import { getRandomNumberInRange } from "../../util/getRandomNumber";
import { Console } from "../../util/Console";
import {MIN_GAME_SIZE, RANDOM_MAX_NUMBER, RANDOM_MIN_NUMBER} from "./_consts";
import {containsOnlyNumbers} from "../../util/containsOnlyNumbers";

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

  static readRacingGameSizeInput() {
    return new Promise((resolve, _) => {
      Console.readLine(
          "시도할 회수는 몇회인가요?",
          (userInput) => {
            resolve(userInput);
          }
      );
    });
  }

  #validateRacingGameSize = (size) => {
    if (!containsOnlyNumbers(size))
      throw new Error(`레이싱 게임 시도 회수를 숫자로 제대로 입력해야합니다.`);
    if (size < MIN_GAME_SIZE)
      throw new Error(`레이싱 게임 시도 회수는 ${MIN_GAME_SIZE} 이상이어야 합니다.`);
  };

  setRacingGameSize(racingGameSize) {
    this.#validateRacingGameSize(racingGameSize)
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

  #playOneRound() {
    for (let playerIdx = 0; playerIdx < this.#players.length; playerIdx++) {
      this.playerPlayOneRound(playerIdx, this.getRandomNumberToRun());
    }
  }

  #printOneRoundGameResult() {
    const result = this.#players
      .map((player) => player.getPositionLog())
      .join("\n");
    Console.print(result, "\n");
  }

  #getWinnerPosition() {
    return Math.max(...this.#players.map((player) => player.getPosition()));
  }

  getWinners() {
    const winnerPosition = this.#getWinnerPosition();
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

  playGame() {
    Console.print("\n실행 결과");
    for (let round = 0; round < this.#racingGameSize; round++) {
      this.#playOneRound();
      this.#printOneRoundGameResult();
    }
    Console.print(this.getWinnerLog());
  }
}
