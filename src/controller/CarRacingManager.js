import { INTERVAL_ROUND_TIME, NAME_SEPARATOR } from "../constants/constants.js";
import CarModel from "../model/CarModel.js";
import GameModel from "../model/GameModel.js";
import { getRandomNumberInRange } from "../utils/utils.js";
import View from "../view/View.js";

export default class CarRacingManager {
  #gameModel = new GameModel();

  gameStart(names, endProcess, totalRound) {
    try {
      this.setParticipants(names);
      this.setTotalRound(totalRound);
      View.printGameStartMessage();
      this.roundInterval(endProcess);
    } catch (error) {
      View.printErrorMessage(error.message);
      View.printGameEndMessage();
      endProcess();
    }
  }

  roundInterval(endProcess) {
    const interval = setInterval(() => {
      this.#gameModel.increaseRound();
      if (this.#gameModel.round > this.#gameModel.totalRound) {
        clearInterval(interval);
        View.printWinnerMessage(this.getWinnersName());
        View.printGameEndMessage();
        endProcess();
        return;
      }

      this.roundStart();
      View.printPerRoundEnd();
    }, INTERVAL_ROUND_TIME);
  }

  roundStart() {
    this.#gameModel.participants.forEach(car => {
      car.go(getRandomNumberInRange());
      View.printCarAndMove(car.name, car.movement);
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
}
