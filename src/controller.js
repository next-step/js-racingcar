import { displayWinners, displayRaceRecords } from "./view.js";
import Race from "./domain/Race.js";
import { CAR } from "./constant/index.js";

export default class Controller {
  #race;

  constructor() {
    this.#race = new Race();
  }

  async initCarNames(getCarNames, nextStep) {
    try {
      const carNames = await getCarNames();

      this.#race.cars = carNames.split(CAR.NAME_SEPARATOR);

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      this.initCarNames(getCarNames, nextStep);
    }
  }

  async initMaxRound(getMaxRound, nextStep) {
    try {
      const input = await getMaxRound();

      this.#race.validateMaxRoundRequired(input);

      const maxRound = Number(input);
      this.#race.maxRound = maxRound;

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      return this.initMaxRound(getMaxRound, nextStep);
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

  get race() {
    return this.#race;
  }
}
