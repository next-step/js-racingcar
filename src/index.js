import { CarRace } from "./domains/CarRace";
import { Console } from "./utils/console";
import { splitByComma } from "./utils/splitByComma";
import { car } from "./validator/car";
import { input } from "./view/input";
import { output } from "./view/output";

export class App {
  #carNames;
  #carRace;
  #winner;
  constructor() {
    this.#carRace = null;
    this.#carNames = [];
    this.#winner = [];
  }
  #validateCarNames() {
    const carNames = this.#carNames;
    car.nameMaxLengthValidator(carNames);
    car.nameMinLengthValidator(carNames);
    car.sameNameValidator(carNames);
  }

  async #carNameStage() {
    const carNamesInput = await input.carName();
    const carNamesSplitByComma = splitByComma(carNamesInput);
    this.#carNames = carNamesSplitByComma;
    this.#validateCarNames(carNamesSplitByComma);
  }

  #raceResultStage() {
    this.#carRace = new CarRace(this.#carNames);
    this.#carRace.totalRound();
    this.#winner = this.#carRace.getWinner();
  }

  async init() {
    try {
      await this.#carNameStage();
      output.raceResultTitle();
      this.#raceResultStage();
      output.carRaceResult(this.#carRace.result);
      output.winner(this.#winner);
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
