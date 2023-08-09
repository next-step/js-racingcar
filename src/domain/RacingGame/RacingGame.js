import { Car } from "../Car/Car";
import { getRandomNumberInRange } from "../../util/getRandomNumber";
import {MIN_GAME_SIZE, RANDOM_MAX_NUMBER, RANDOM_MIN_NUMBER} from "./RacingGame.const";
import {containsOnlyNumbers} from "../../util/containsOnlyNumbers";

export class RacingGame {
  #racingGameSize;
  #players;

  constructor() {
    this.#racingGameSize = 0;
    this.#players = [];
  }

  #validateRacingGameSize = (size) => {
    if (!containsOnlyNumbers(size))
      throw new Error(`레이싱 게임 시도 회수를 숫자로 제대로 입력해야합니다.`);
    if (size < MIN_GAME_SIZE)
      throw new Error(`레이싱 게임 시도 회수는 ${MIN_GAME_SIZE} 이상이어야 합니다.`);
  };

  getRacingGameSize() {
    return this.#racingGameSize;
  }
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

  playOneRound() {
    for (let playerIdx = 0; playerIdx < this.#players.length; playerIdx++) {
      this.playerPlayOneRound(playerIdx, this.getRandomNumberToRun());
    }
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
}
