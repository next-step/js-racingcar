function sleeping(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

export class CarRacingManager {
  #canMoveCondition = 4;
  #names = [];
  #moves = [];
  #round = 0;

  constructor() {}

  gameStart(names, endProcess, wait) {
    try {
      this.#setNamesAndMoves(names);
      this.#printParticipants(names);
      this.roundInterval(endProcess, wait || sleeping);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  #setNamesAndMoves(names) {
    this.names = names;
    this.#moves = Array(this.names.length).fill(0);
  }

  #printParticipants(names) {
    console.log(`참가자: ${names}`);
  }

  roundInterval(endProcess, wait) {
    this.#round++;
    if (this.#round > 5) {
      return this.gameEnd(endProcess, `winner is ${this.winner}`);
    }

    this.roundStart();

    wait(1_000);
    this.roundInterval(endProcess, wait);
  }

  roundStart() {
    console.log(`round ${this.#round} start`);

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

  get winner() {
    return "헤헤";
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

export const ERROR_MESSAGES = {
  OVER_MAXIMUM_NAME_LENGTH: "이름은 5자 이하만 가능합니다.",
};

export const GAME_MESSAGES = {
  QUESTION:
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  GAME_OVER: "게임이 종료되었습니다.",
};

export const INTEGERS_UNDER_TEN = Array(10)
  .fill(0)
  .map((v, i) => v + i);
