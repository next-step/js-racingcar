import Car from './Domain/Car.js';
import RacingGame from './Domain/RacingGame.js';
import View from './View/View.js';
import MESSAGES from './constants/Messages.js';

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

  printRoundResult() {
    this.#view.printMessage(MESSAGES.output.gameResult);

    this.#racingGame.results.forEach(result => {
      this.#view.printRoundState(result);
    });
  }

  printWinners() {
    const winners = this.#racingGame.winners.map(winner => winner.name);

    this.#view.printWinners(winners);
  }

  printGameResult() {
    this.printRoundResult();
    this.printWinners();
  }

  async play() {
    await this.setRacingGame();

    this.#racingGame.startGame();

    this.printGameResult();
  }
}

export default App;
