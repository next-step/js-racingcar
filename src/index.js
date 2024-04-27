import { CONSOLE_MESSAGES } from "./constants/messages";
import { CarRace } from "./domains/CarRace";
import { Console } from "./utils/console";
import { splitByComma } from "./utils/splitByComma";
import { car } from "./validator/car";

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
  }

  async #carNameStage() {
    const carNamesInput = await Console.input(CONSOLE_MESSAGES.START);
    const carNamesSplitByComma = splitByComma(carNamesInput);
    this.#carNames = carNamesSplitByComma;
    this.#validateCarNames(carNamesSplitByComma);
  }

  #raceResultStage() {
    this.#carRace = new CarRace(this.#carNames);
    this.#carRace.totalRound();
  }

  #printCarRaceResult() {
    const result = this.#carRace.result;
    result.map((round) => {
      round.map((car) => Console.printCarPosition(car));
      Console.print("");
    });
  }
  #printWinner() {
    const winnerWithComma = this.#winner.map((car) => car.name).join(", ");
    Console.print(CONSOLE_MESSAGES.WINNER(winnerWithComma));
    Console.exit();
  }
  async init() {
    try {
      await this.#carNameStage();
      Console.print(CONSOLE_MESSAGES.RACE_RESULT);
      this.#raceResultStage();
      this.#printCarRaceResult();

      this.#winner = this.#carRace.getWinner();

      this.#printWinner();
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
