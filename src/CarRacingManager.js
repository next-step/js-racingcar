import {
  CONDITIONS,
  GAME_MESSAGES,
  MOVEMENT_PRINT,
  NAME_SEPARATOR,
} from "./constants.js";
import { CarModel } from "./model/CarModel.js";
import { GameModel } from "./model/GameModel.js";
import { getRandomIntegerUnderTen, sleeping } from "./utils.js";

export class CarRacingManager {
  #gameModel = new GameModel();

  constructor() {}

  gameStart(names, endProcess, wait = sleeping) {
    try {
      this.setParticipants(names);
      console.log("\n실행결과");
      this.roundInterval(endProcess, wait);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  getParticipantsName() {
    return this.#gameModel.participants.map((v) => v.name);
  }

  setParticipants(names) {
    this.#gameModel.participants = names
      .split(NAME_SEPARATOR)
      .map((name) => new CarModel(name.trim()));
  }

  roundInterval(endProcess, wait) {
    this.#gameModel.increaseRound();
    if (this.#gameModel.round > CONDITIONS.max_round_number) {
      return this.gameEnd(endProcess, `${this.winners}가 최종 우승했습니다.`);
    }

    this.roundStart();

    wait(1_000);
    console.log("");
    this.roundInterval(endProcess, wait);
  }

  roundStart() {
    this.#gameModel.participants.forEach((car) => {
      car.go(getRandomIntegerUnderTen());
      this.printCarAndMove(car.name, car.movement);
    });
  }

  printCarAndMove(name, movement) {
    console.log(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`);
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
    const maxMoveIndexes = this.getMaxIndexes(
      this.#gameModel.participants.map((car) => car.movement)
    );

    return maxMoveIndexes
      .map((v) => this.getParticipantsName()[v])
      .join(NAME_SEPARATOR);
  }

  canMove(aNumber) {
    return aNumber >= CONDITIONS.can_move_number;
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
}
