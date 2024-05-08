import { CAR } from "./constant/index.js";

export default class Controller {
  #view;
  #race;

  constructor(view, race) {
    this.#view = view;
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
      this.#view.displayRaceRecords(this.#race.currentRoundRecord);
    }
  }

  finish() {
    this.#view.displayWinners(this.#race.winners);
  }
}
