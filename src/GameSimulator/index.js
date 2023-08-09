import Car from '../Car/index.js';
import RacingGame from '../RacingGame/index.js';

class GameSimulator {
  #racingGame;
  #gameViewer;
  #gameInput;
  checkCanMoveForward;

  constructor(gameViewer, gameInput, checkCanMoveForward) {
    this.#gameViewer = gameViewer;
    this.#gameInput = gameInput;
    this.checkCanMoveForward = checkCanMoveForward;
  }

  async setRacingGame() {
    const inputString = await this.#gameInput.getCarNamesByInput();
    const carNames = inputString.split(',');
    const cars = carNames.map(Car.of);
    const maxRounds = await this.#gameInput.getMaxRounsByInput();

    this.#racingGame = new RacingGame(cars, maxRounds);
  }

  async startGame() {
    try {
      await this.setRacingGame();

      this.#racingGame.startRace({
        checkCanMoveForward: this.checkCanMoveForward,
      });
      this.#gameViewer.printRecords(this.#racingGame.records);
      this.#gameViewer.printWinningCars(this.#racingGame.winningCars);
    } catch (error) {
      this.#gameViewer.printRestart(error.message);
      this.startGame();
    }
  }
}

export default GameSimulator;
