import {
  CONDITIONS,
  GAME_MESSAGES,
  MOVEMENT_PRINT,
  NAME_SEPARATOR,
} from "../constants/constants.js";
import { CarModel } from "../model/CarModel.js";
import { GameModel } from "../model/GameModel.js";
import { getRandomNumberInRange, sleeping } from "../utils/utils.js";

export class CarRacingManager {
  #gameModel = new GameModel();

  constructor() {}

  gameStart(names, endProcess, wait = sleeping) {
    try {
      this.setParticipants(names);
      console.log(GAME_MESSAGES.GAME_START);
      this.roundInterval(endProcess, wait);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  roundInterval(endProcess, wait) {
    this.#gameModel.increaseRound();
    if (this.#gameModel.round > CONDITIONS.max_game_round_number) {
      return this.gameEnd(endProcess, `${this.winners}가 최종 우승했습니다.`);
    }

    this.roundStart();

    wait(1_000);
    console.log("");
    this.roundInterval(endProcess, wait);
  }

  roundStart() {
    this.#gameModel.participants.forEach((car) => {
      car.go(getRandomNumberInRange());
      this.printCarAndMove(car.name, car.movement);
    });
  }

  gameEnd(endProcess, message) {
    this.printGameEndMessage(message);
    endProcess();
  }

  getParticipantsName() {
    return this.#gameModel.participants.map((v) => v.name);
  }

  setParticipants(names) {
    this.#gameModel.participants = names
      .split(NAME_SEPARATOR)
      .map((name) => new CarModel(name.trim()));
  }

  get winners() {
    const maxMoveIndexes = this.getIndexesOfMaxValue(
      this.#gameModel.participants.map((car) => car.movement)
    );

    return maxMoveIndexes
      .map((v) => this.getParticipantsName()[v])
      .join(NAME_SEPARATOR);
  }

  printCarAndMove(name, movement) {
    console.log(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`);
  }

  printGameEndMessage(message) {
    if (message) console.log(message);
    console.log(GAME_MESSAGES.GAME_OVER);
  }

  getIndexesOfMaxValue(arr) {
    const max = Math.max(...arr);

    return arr.reduce((acc, cur, index) => {
      return cur === max ? [...acc, index] : acc;
    }, []);
  }
}
