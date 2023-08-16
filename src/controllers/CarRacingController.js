import { CAR_SEPERATOR } from "../constants/Characters";
import { INPUT_CAR_NAMES, RESULT_OF_RACE } from "../constants/Messages";
import { RACE_MAX_ROUND } from "../constants/Numbers";
import Car from "../models/Car";
import Race from "../models/Race";
import ConsoleInput from "../views/ConsoleInput";
import ConsoleOutput from "../views/ConsoleOutput";

class CarRacingController {
  #readline;
  #race;
  #consoleInput;
  #consoleOutput;

  constructor(readline) {
    this.#readline = readline;
    this.#consoleInput = new ConsoleInput(readline);
    this.#consoleOutput = new ConsoleOutput();
  }

  #splitToCars(carNames) {
    const cars = carNames.split(CAR_SEPERATOR).map((car) => new Car(car));

    return cars;
  }

  getRace() {
    return this.#race;
  }

  async startRace() {
    const carNames = await this.#consoleInput.readline(INPUT_CAR_NAMES);
    this.#readline.close();

    try {
      const cars = this.#splitToCars(carNames);
      this.#race = new Race(cars);
    } catch (e) {
      console.error(e.message);
      return;
    }

    this.playRace();
  }

  playRace() {
    this.#consoleOutput.print(`\n${RESULT_OF_RACE}`);
    for (let i = 0; i < RACE_MAX_ROUND; i++) {
      this.#race.playOneRound();
      this.#consoleOutput.printAllPositions(this.#race.getCars());
    }

    this.#race.pickWinners();

    this.endRace();
  }

  endRace() {
    this.#consoleOutput.printWinners(this.#race.getWinners());
  }
}

export default CarRacingController;
