import { MESSAGE, ERROR_MESSAGE } from "./constant/index.js";
import Race from "./domain/Race.js";
import { displayWinners, displayRace } from "./view.js";

export function playGame(carNames, maxRound) {
  if (carNames === undefined) {
    throw new Error("자동차 이름을 입력해주세요.");
  }

  if (maxRound < 0) {
    throw new Error("시도할 횟수는 0보다 커야합니다.");
  }

  if (maxRound === undefined) {
    throw new Error("시도할 횟수를 입력해주세요.");
  }

  if (isNaN(maxRound)) {
    throw new Error("시도할 횟수는 숫자여야합니다.");
  }

  try {
    const race = new Race(carNames.split(","), maxRound);

    console.log(MESSAGE.RESULT);
    while (race.currentRound < race.maxRound) {
      race.playRound();
      displayRace(race.cars);
    }

    displayWinners(race);

    return race;
  } catch (error) {
    console.error(ERROR_MESSAGE.PLAY_ERROR);
    throw error;
  }
}

export default class Controller {
  #race;

  constructor() {
    this.#race = new Race();
  }

  async initCarNames(askCarNames, nextStep) {
    try {
      const carNames = await askCarNames();

      if (carNames === "") {
        throw new Error("자동차 이름을 입력해주세요.");
      }

      this.#race.cars = carNames.split(",");

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      this.initCarNames(askCarNames, nextStep);
    }
  }

  async initMaxRound(askMaxRound, nextStep) {
    try {
      const maxRound = Number(await askMaxRound());

      if (maxRound === "") {
        throw new Error("시도할 횟수를 입력해주세요.");
      }

      if (isNaN(maxRound)) {
        throw new Error("시도할 횟수는 숫자여야합니다.");
      }

      if (Math.floor(maxRound) !== maxRound) {
        throw new Error("시도할 횟수는 자연수여야합니다.");
      }

      if (maxRound <= 0) {
        throw new Error("시도할 횟수는 0보다 커야합니다.");
      }

      this.#race.maxRound = maxRound;

      if (nextStep) {
        await nextStep();
      }
    } catch (error) {
      console.error(error.message);
      return this.initMaxRound(askMaxRound, nextStep);
    }
  }

  get race() {
    return this.#race;
  }
}
