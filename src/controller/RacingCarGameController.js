import GameTrack from "../model/GameTrack";
import GameWinners from "../model/GameWinners";

import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import {
  CAR_NAME_INPUT_PROMPT,
  NUM_RACING_ROUNDS,
  WINNER_ANNOUNCEMENT_MESSAGE,
} from "../constants/rules";

import { updateView } from "../view/PrintView";

export default class RacingCarGameController {
  constructor(readline) {
    this.readline = readline;
    this.gameCount = 0;
    this.gameTrack = new GameTrack();
    this.gameWinners = new GameWinners();
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_PROMPT, carName => {
      try {
        if (!carName) throw Error(ERROR_MESSAGE.noEmptyName);

        updateView.print(`\n 실행결과 \n`);

        this.gameTrack.setGameStatus(carName);
        this.startRace();

        this.gameWinners.setGameWinners(this.gameTrack.gameStatus);
        this.getWinners();

        this.endGame();
      } catch (error) {
        updateView.print(error.message);
        this.exit();
      }
    });
  }

  startRace() {
    while (this.gameCount < NUM_RACING_ROUNDS) {
      this.gameTrack.setAdvanceCars();

      this.gameCount++;
      this.getGameStatus();
      updateView.print("\n");
    }
  }

  getGameStatus() {
    this.gameTrack.gameStatus.forEach(car => {
      updateView.print(`${car.carName}: ${car.forward}`);
    });
  }

  getWinners() {
    const winnerList = this.gameWinners.winners.join(",");
    return updateView.print(winnerList + WINNER_ANNOUNCEMENT_MESSAGE);
  }

  endGame() {
    this.readline.close();
  }

  exit() {
    throw Error(ERROR_MESSAGE["invalidInput"]);
  }
}
