import GameModel from "../model/GameModel.js";
import View from "../view/View.js";

export default class CarRacingManager {
  #gameModel = new GameModel("ddddd,dddd", 4);

  #view = View;

  async run() {
    await this.settingGame();
    this.playGame();
    this.endGame();
  }

  async settingGame() {
    await this.retryUntilSuccess(async () => {
      this.#gameModel.participants = await this.#view.askNames();
    });

    await this.retryUntilSuccess(async () => {
      this.#gameModel.totalRound = await this.#view.askTotalRound();
    });
  }

  playGame() {
    this.#view.printGameStartMessage();
    this.#gameModel.play();
    this.#view.printResult(this.#gameModel);
  }

  endGame() {
    this.#view.printGameEndMessage();
    this.#view.end();
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
