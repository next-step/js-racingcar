import { MESSAGE, ERROR_MESSAGE } from "./constant/index.js";
import Race from "./domain/Race.js";
import { displayWinners, displayRace } from "./view.js";

export function playGame(carNames) {
  try {
    const race = new Race(carNames.split(","));

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
