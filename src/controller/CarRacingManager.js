import { INTERVAL_ROUND_TIME, NAME_SEPARATOR } from "../constants/constants.js";
import CarModel from "../model/CarModel.js";
import GameModel from "../model/GameModel.js";
import { getRandomNumberInRange } from "../utils/utils.js";
import View from "../view/View.js";

export default class CarRacingManager {
  #gameModel = new GameModel();

  #view = View;

  async start() {
    await this.settingGame();
    await this.playGame();
    this.endGame();
  }

  async settingGame() {
    await this.retryUntilSuccess(async () => {
      this.setParticipants(await this.#view.askNames());
    });

    await this.retryUntilSuccess(async () => {
      this.setTotalRound(await this.#view.askTotalRound());
    });
  }

  async playGame() {
    this.#view.printGameStartMessage();
    await this.roundInterval();
    this.#view.printWinnerMessage(this.getWinnersName());
  }

  endGame() {
    this.#view.printGameEndMessage();
    this.#view.end();
  }

  roundInterval() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        this.#gameModel.increaseRound();
        if (this.#gameModel.round > this.#gameModel.totalRound) {
          clearInterval(interval);
          resolve();
          return;
        }

        this.roundStart();
        this.#view.printPerRoundEnd();
      }, INTERVAL_ROUND_TIME);
    });
  }

  roundStart() {
    this.#gameModel.participants.forEach(car => {
      car.go(getRandomNumberInRange());
      this.#view.printCarAndMove(car.name, car.movement);
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

  async retryUntilSuccess(callback) {
    try {
      await callback();
    } catch (error) {
      this.#view.printErrorMessage(error.message);
      await this.retryUntilSuccess(callback);
    }
  }
}
