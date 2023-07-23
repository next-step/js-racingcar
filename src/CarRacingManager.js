import { ERROR_MESSAGES, GAME_MESSAGES } from "./constants";
import { sleeping } from "./utils";

export class CarRacingManager {
  #canMoveCondition = 4;
  #names = [];
  #moves = [];
  #round = 0;

  constructor() {}

  gameStart(names, endProcess, wait = sleeping) {
    try {
      this.#setNamesAndMoves(names);
      console.log("\n실행결과");
      this.roundInterval(endProcess, wait);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  #setNamesAndMoves(names) {
    this.names = names;
    this.#moves = Array(this.names.length).fill(0);
  }

  roundInterval(endProcess, wait) {
    this.#round++;
    if (this.#round > 5) {
      return this.gameEnd(endProcess, `${this.winners}가 최종 우승했습니다.`);
    }

    this.roundStart();

    wait(1_000);
    console.log("");
    this.roundInterval(endProcess, wait);
  }

  roundStart() {
    this.#names.forEach((name, i) => {
      if (this.#getRandomIntegerUnderTen()) {
        this.#moves[i]++;
      }

      this.printCarAndMove(name, this.#moves[i]);
    });
  }

  printCarAndMove(name, move) {
    console.log(`${name}: ${"-".repeat(move)}`);
  }

  gameEnd(endProcess, message) {
    this.printGameEndMessage(message);
    endProcess();
  }

  printGameEndMessage(message) {
    if (message) console.log(message);
    console.log(GAME_MESSAGES.GAME_OVER);
  }

  get winners() {
    const maxMoveIndexes = this.getMaxIndexes(this.#moves);
    return maxMoveIndexes.map((v) => this.names[v]).join(", ");
  }

  getMaxIndexes(arr) {
    let maxCount = 0;
    let maxIndexes = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxCount) maxCount = arr[i];
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === maxCount) maxIndexes.push(i);
    }

    return maxIndexes;
  }

  get names() {
    return this.#names;
  }

  set names(str) {
    const names = str.split(",").map((v) => v.trim());
    if (names.some((name) => name.length > 5)) {
      throw new Error(ERROR_MESSAGES.OVER_MAXIMUM_NAME_LENGTH);
    }

    this.#names = names;
  }

  canMove(aNumber) {
    return aNumber >= this.#canMoveCondition;
  }

  #getRandomIntegerUnderTen() {
    return Math.floor(Math.random() * 10);
  }
}
