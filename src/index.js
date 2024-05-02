import { Car } from "./domains/Car";
import { CarRace } from "./domains/CarRace";
import { Console } from "./utils/console";
import { splitByComma } from "./utils/splitByComma";
import { car } from "./validator/car";
import { input } from "./view/input";
import { output } from "./view/output";

export class App {
  #carInstance;
  #carRace;
  #winner;
  constructor() {
    this.#carRace = null;
    this.#carInstance = [];
    this.#winner = [];
  }

  #makeCarInstance(carNames) {
    return carNames.map(carName => new Car(carName));
  }

  async #inputCarName() {
    const carNamesInput = await input.carName();
    const carNamesSplitByComma = splitByComma(carNamesInput);
    car.nameValidator(carNamesSplitByComma);
    this.#carInstance = this.#makeCarInstance(carNamesSplitByComma);
  }

  async #carNameStage() {
    await this.#inputCarName();
    this.#carRace = new CarRace(this.#carInstance);
  }

  #raceResultStage() {
    this.#carRace.totalRound();
    this.#winner = this.#carRace.getWinner();
  }

  #printRaceResult() {
    output.raceResultTitle();
    output.carRaceResult(this.#carRace.result);
    output.winner(this.#winner);
  }

  async init() {
    try {
      await this.#carNameStage();
      this.#raceResultStage();
      this.#printRaceResult();
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
