import { displayWinners, displayRaceRecords } from "./view.js";
import Race from "./domain/Race.js";
import { CAR } from "./constant/index.js";

export default class Controller {
  #race;

  constructor(race) {
    this.#race = race;
  }

  async initCarNames(getCarNames) {
    try {
      const carNames = await getCarNames();
      this.#race.cars = await carNames.split(CAR.NAME_SEPARATOR);
    } catch (error) {
      console.error(error.message);

      return this.initCarNames(getCarNames);
    }
  }

  async initMaxRound(getMaxRound) {
    try {
      const input = await getMaxRound();
      this.#race.validateMaxRoundRequired(input);

      const maxRound = Number(input);
      this.#race.maxRound = maxRound;
    } catch (error) {
      console.error(error.message);

      return this.initMaxRound(getMaxRound);
    }
  }

  playRaceGame() {
    for (let i = 0; i < this.#race.maxRound; i++) {
      this.#race.playRound();
      displayRaceRecords(this.#race.currentRoundRecord);
    }
  }

  finish() {
    displayWinners(this.#race.winners);
  }
}
