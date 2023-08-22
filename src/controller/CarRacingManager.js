import GameModel from "../model/GameModel.js";
import View from "../view/View.js";

export default class CarRacingManager {
  #gameModel;

  #view = View;

  async run() {
    await this.settingGame();
    await this.playGame();
    this.endGame();
  }

  async settingGame() {
    let names;
    let totalRound;
    await this.retryUntilSuccess(async () => {
      names = await this.#view.askNames();
      GameModel.validateParticipants(GameModel.participantsMapFrom(names));
    });

    await this.retryUntilSuccess(async () => {
      totalRound = await this.#view.askTotalRound();
      GameModel.validateTotalRound(totalRound);
    });
    this.#gameModel = new GameModel(names, totalRound);
  }

  async playGame() {
    this.#view.printGameStartMessage();
    this.#gameModel.play();
    await this.#view.printResult(this.#gameModel);
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
