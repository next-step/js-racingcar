import {
  GAME_MESSAGES,
  INTERVAL_ROUND_TIME,
  MOVEMENT_PRINT,
  NAME_SEPARATOR,
} from "../constants/constants.js";
import CarModel from "../model/CarModel.js";
import GameModel from "../model/GameModel.js";
import { getRandomNumberInRange } from "../utils/utils.js";

export default class CarRacingManager {
  #gameModel = new GameModel();

  gameStart(names, endProcess, totalRound) {
    try {
      this.setParticipants(names);
      this.setTotalRound(totalRound);
      console.log(GAME_MESSAGES.GAME_START);
      this.roundInterval(endProcess);
    } catch (error) {
      CarRacingManager.gameEnd(endProcess, error.message);
    }
  }

  roundInterval(endProcess) {
    const interval = setInterval(() => {
      this.#gameModel.increaseRound();
      if (this.#gameModel.round > this.#gameModel.totalRound) {
        clearInterval(interval);
        const winnerMessage = `${this.getWinnersName()}가 최종 우승했습니다.`;
        return CarRacingManager.gameEnd(endProcess, winnerMessage);
      }

      this.roundStart();

      return console.log("");
    }, INTERVAL_ROUND_TIME);
  }

  roundStart() {
    this.#gameModel.participants.forEach(car => {
      car.go(getRandomNumberInRange());
      CarRacingManager.printCarAndMove(car.name, car.movement);
    });
  }

  getParticipantsName() {
    return this.#gameModel.participants.map(v => v.name);
  }

  getWinnersName(winners = this.#gameModel.winners) {
    return winners.map(winner => winner.name).join(NAME_SEPARATOR);
  }

  setParticipants(names) {
    this.#gameModel.participants = names
      .split(NAME_SEPARATOR)
      .map(name => new CarModel(name.trim()));
  }

  setTotalRound(totalRound) {
    this.#gameModel.totalRound = totalRound;
  }

  static gameEnd(endProcess, message) {
    CarRacingManager.printGameEndMessage(message);
    endProcess();
  }

  static printCarAndMove(name, movement) {
    console.log(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`);
  }

  static printGameEndMessage(message) {
    if (message) console.log(message);
    console.log(GAME_MESSAGES.GAME_OVER);
  }
}
