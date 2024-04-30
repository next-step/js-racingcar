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
