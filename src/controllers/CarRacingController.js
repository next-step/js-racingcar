import { CAR_SEPERATOR } from "../constants/Characters";
import { INVALID_NUM_OF_ROUND } from "../constants/ErrorMessages";
import {
  INPUT_CAR_NAMES,
  RESULT_OF_RACE,
  TRIAL_NUM_OF_ROUND,
} from "../constants/Messages";
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
    try {
      const cars = await this.readCars();
      this.#race = new Race(cars);
      const numOfRound = await this.readNumOfRound();
      this.playRace(numOfRound);
    } catch (e) {
      console.error(e.message);
      return this.startRace();
    }
  }

  async readCars() {
    const carNames = await this.#consoleInput.readline(INPUT_CAR_NAMES);

    try {
      const cars = this.#splitToCars(carNames);
      return cars;
    } catch (e) {
      console.error(e.message);
      return await this.readCars();
    }
  }

  async readNumOfRound() {
    const number = Number(
      await this.#consoleInput.readline(TRIAL_NUM_OF_ROUND)
    );

    if (isNaN(number) || number < 1) {
      console.error(INVALID_NUM_OF_ROUND);
      return await this.readNumOfRound();
    }

    return number;
  }

  playRace(numOfRound) {
    this.#consoleOutput.print(`\n${RESULT_OF_RACE}`);
    for (let i = 0; i < numOfRound; i++) {
      this.#race.playOneRound();
      this.#consoleOutput.printAllPositions(this.#race.getCars());
    }

    this.#race.pickWinners();
    this.endRace();
  }

  endRace() {
    this.#consoleOutput.printWinners(this.#race.getWinners());
    this.#readline.close();
  }
}

export default CarRacingController;
