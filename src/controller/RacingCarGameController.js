import GameTrack from "../model/GameTrack";
import GameWinners from "../model/GameWinners";

import {
  CAR_NAME_INPUT_PROMPT,
  DEFAULT_SCORE,
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
  RACE_FORWARD_RANDOM_NUMBER_LIMIT,
  HOW_MANY_TRIES_PROMPT,
  WINNER_ANNOUNCEMENT_MESSAGE,
} from "../constants/rules";

import { updateView } from "../view/PrintView";

import { getRandomNumber, validateDuplicationItemList } from "../utils/helpers";
import { validateNameList } from "./validator.js";

export default class RacingCarGameController {
  constructor(readline) {
    this.readline = readline;
    this.gameCount = 0;
    this.gameTrack = new GameTrack();
    this.gameWinners = new GameWinners();
    this.forwardScoreIcon;
    this.numberRacingRounds;
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_PROMPT, carName => {
      try {
        const carNameList = carName.split(",").map(item => item.trim());
        validateDuplicationItemList(carNameList);
        validateNameList(carNameList);

        this.readline.question(HOW_MANY_TRIES_PROMPT, tryChance => {
          this.numberRacingRounds = tryChance;

          updateView.print(`\n 실행결과 \n`);

          this.gameTrack.setGameStatus(carName);
          this.startRace(this.numberRacingRounds);

          this.gameWinners.setGameWinners(this.gameTrack.gameStatus);
          const winners = this.getWinners();
          updateView.printWinners(winners + WINNER_ANNOUNCEMENT_MESSAGE);

          this.endGame();
        });
      } catch (error) {
        this.exit(error);
      }
    });
  }

  startRace(racingRounds) {
    this.setForwardScoreIcon(DEFAULT_SCORE);

    while (this.gameCount < racingRounds) {
      this.setAdvanceCars();

      this.gameCount++;

      const gameStatus = this.getGameStatus();
      updateView.printGameStatus(gameStatus);

      updateView.print("\n");
    }
  }

  setForwardScoreIcon(icon) {
    this.forwardScoreIcon = icon;
  }

  setAdvanceCars() {
    this.gameTrack.gameStatus.forEach(currentStatus => {
      if (
        getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER) >=
        RACE_FORWARD_RANDOM_NUMBER_LIMIT
      ) {
        currentStatus.forward += this.forwardScoreIcon;
      }
    });
  }

  getGameStatus() {
    return this.gameTrack.gameStatus.map(
      car => `${car.carName}: ${car.forward}`
    );
  }

  getWinners() {
    return this.gameWinners.winners.join(",");
  }

  endGame() {
    this.readline.close();
  }

  replayGame() {
    this.startGame();
  }

  exit(error) {
    updateView.print(error.message);
    return this.replayGame();
  }
}
