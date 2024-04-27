import Car from './Domain/Car.js';
import RacingGame from './Domain/RacingGame.js';
import View from './View/View.js';

class App {
  #view = new View();

  #racingGame;

  async readCarList() {
    const cars = await this.#view.readCars();

    return cars.map(car => new Car(car));
  }

  async setRacingGame() {
    const cars = await this.readCarList();

    this.#racingGame = new RacingGame(cars);
  }

  printGameResult() {
    const gameResult = this.#racingGame.getGameResult;

    this.#view.printGameResult(gameResult);
  }

  async play() {
    await this.setRacingGame();

    this.#racingGame.startGame();

    this.printGameResult();
  }
}

export default App;
