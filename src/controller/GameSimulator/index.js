import Car from '../../domain/Car/index.js';
import RacingGame from '../../domain/RacingGame/index.js';

class GameSimulator {
  #racingGame;
  #gameViewer;
  #gameInput;
  #carNames;
  #maxRounds;

  constructor(gameViewer, gameInput) {
    this.#gameViewer = gameViewer;
    this.#gameInput = gameInput;
  }

  async setRacingGame() {
    if (!this.#carNames) {
      await this.setCarNames();
    }

    if (!this.#maxRounds) {
      await this.setMaxRounds();
    }

    this.#racingGame = new RacingGame(this.#carNames, this.#maxRounds);
  }

  async setCarNames() {
    const inputString = await this.#gameInput.getCarNamesByInput();

    this.#carNames = inputString.split(',');
  }

  async setMaxRounds() {
    this.#maxRounds = await this.#gameInput.getMaxRounsByInput();
  }

  async startGame(checkCanMoveForward) {
    try {
      await this.setRacingGame();

      this.#racingGame.startRace(checkCanMoveForward);
      this.#gameViewer.printRecords(this.#racingGame.records);
      this.#gameViewer.printWinningCars(this.#racingGame.winningCars);
    } catch (error) {
      this.handleError(error.message);
    }
  }

  restartGame() {
    this.#gameViewer.printRestart();
    this.startGame();
  }

  restartGameFromCarNames() {
    this.#carNames = null;
    this.#maxRounds = null;
    this.restartGame();
  }

  restartGameFromMaxRounds() {
    this.#maxRounds = null;
    this.restartGame();
  }

  handleError(errorMessage) {
    this.#gameViewer.printErrorMessage(errorMessage);

    switch (errorMessage) {
      case Car.NAME_ERROR_MESSAGE.NOT_STRING:
      case Car.NAME_ERROR_MESSAGE.LESS_THAN_MIN:
      case Car.NAME_ERROR_MESSAGE.OVER_THAN_MAX:
        this.restartGameFromCarNames();

        break;
      case RacingGame.ERROR_MESSAGE.INVALID_MAX_ROUNDS:
        this.restartGameFromMaxRounds();

        break;
    }
  }
}

export default GameSimulator;
