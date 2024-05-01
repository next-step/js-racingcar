import Car from './Domain/Car.js';
import RacingGame from './Domain/RacingGame.js';
import View from './View/View.js';

class App {
  #view = new View();

  #racingGame;

  async getRacingCars() {
    const carNames = await this.#view.readCarNames();

    return carNames.map(car => new Car(car));
  }

  async setRacingGame() {
    const racingCars = await this.getRacingCars();

    this.#racingGame = new RacingGame(racingCars);
  }

  printGameResult() {
    const gameResult = this.#racingGame.getGameResult();

    this.#view.printGameResult(gameResult);
  }

  async play() {
    await this.setRacingGame();

    this.#racingGame.startGame();

    this.printGameResult();
  }
}

export default App;
