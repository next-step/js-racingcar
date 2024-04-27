import { CONSOLE_MESSAGES } from "./constants/messages";
import { CarRace } from "./domains/CarRace";
import { Console } from "./utils/console";
import { splitByComma } from "./utils/splitByComma";
import { car } from "./validator/car";

export class App {
  #carNames;
  #winner;
  constructor() {
    this.#carNames = [];
    this.#winner = [];
  }

  async #carNameStage() {
    const carNames = await Console.input(CONSOLE_MESSAGES.START);
    const carNamesSplitByComma = splitByComma(carNames);
    car.nameLengthValidator(carNamesSplitByComma);
    this.#carNames = carNamesSplitByComma;
  }

  #raceResultStage() {
    Console.print(CONSOLE_MESSAGES.RACE_RESULT);
    const carRace = new CarRace(this.#carNames);
    carRace.totalRound();
    return carRace.result;
  }
  #printCarRaceResult(result) {
    result.map((round) => {
      round.map((car) => Console.printCarPosition(car));
      Console.print("");
    });
  }
  async init() {
    try {
      const carNameInput = await this.#carNameStage();
      const carRaceResult = this.#raceResultStage(carNameInput);
      this.#printCarRaceResult(carRaceResult);
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
