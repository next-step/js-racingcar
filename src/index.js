import { Car, Race } from "./domain";
import { RandomMoveStrategy } from "./domain/strategies";
import { View } from "./views";

export class App {
  #race;

  async play() {
    try {
      let carNames = await View.getCarNamesPrompt();
      if (carNames.length === 0) return;
      if (!Array.isArray(carNames))
        carNames = carNames.split(",").map((name) => name.trim());

      const raceRound = await View.getRaceRoundPrompt();

      this.#race = new Race(
        carNames.map((name) => new Car(name)),
        new RandomMoveStrategy(),
        raceRound
      );
      const result = this.#race.race();
      this.#render(result);
    } catch (error) {
      View.printError(error);
    }
  }

  #render(raceResult) {
    View.printRoundStart();
    raceResult.forEach((result) => {
      View.printRaceResult(result.cars);
    });
    View.printWinners(this.#race.winners);
  }

  getRace() {
    return this.#race;
  }
}

const app = new App();
app.play();
