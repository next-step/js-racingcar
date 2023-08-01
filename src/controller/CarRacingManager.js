import {
  CONDITIONS,
  GAME_MESSAGES,
  INTERVAL_ROUND_TIME,
  MOVEMENT_PRINT,
  NAME_SEPARATOR,
} from "../constants/constants.js";
import { CarModel } from "../model/CarModel.js";
import { GameModel } from "../model/GameModel.js";
import { getRandomNumberInRange } from "../utils/utils.js";

export class CarRacingManager {
  #gameModel = new GameModel();

  constructor() {}

  gameStart(names, endProcess) {
    try {
      this.setParticipants(names);
      console.log(GAME_MESSAGES.GAME_START);
      this.roundInterval(endProcess);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  roundInterval(endProcess) {
    const interval = setInterval(() => {
      this.#gameModel.increaseRound();
      if (this.#gameModel.round > CONDITIONS.max_game_round_number) {
        clearInterval(interval);
        const winnerMessage = `${this.getWinnersName()}가 최종 우승했습니다.`;
        return this.gameEnd(endProcess, winnerMessage);
      }

      this.roundStart();

      console.log("");
    }, INTERVAL_ROUND_TIME);
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

  getWinnersName(winners = this.#gameModel.winners) {
    return winners.map((winner) => winner.name).join(NAME_SEPARATOR);
  }

  setParticipants(names) {
    this.#gameModel.participants = names
      .split(NAME_SEPARATOR)
      .map((name) => new CarModel(name.trim()));
  }

  printCarAndMove(name, movement) {
    console.log(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`);
  }

  printGameEndMessage(message) {
    if (message) console.log(message);
    console.log(GAME_MESSAGES.GAME_OVER);
  }
}
