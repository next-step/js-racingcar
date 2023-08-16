import GameTrack from "../../domain/model/GameTrack";
import GameWinners from "../../domain/model/GameWinners";

import { updateView } from "../View/PrintView";

import {
  CAR_NAME_INPUT_PROMPT,
  HOW_MANY_TRIES_PROMPT,
} from "../../constants/rules";

import { validatePositiveNumber } from "./validator";

export default class RacingCarGameController {
  constructor(readline) {
    this.readline = readline;
    this.gameCount = 0;
    this.gameTrack = new GameTrack();
    this.gameWinners = new GameWinners();
  }

  askQuestion(prompt) {
    return new Promise(resolve => {
      this.readline.question(prompt, resolve);
    });
  }

  async startGame() {
    try {
      const carName = await this.askQuestion(CAR_NAME_INPUT_PROMPT);
      await this.gameTrack.setGameCarList(carName);

      const racingRounds = await this.askQuestion(HOW_MANY_TRIES_PROMPT);

      validatePositiveNumber(Number(racingRounds));
      await this.handleRaceRoundWinner(racingRounds);
    } catch (error) {
      this.exit(error);
    }
  }

  /**
   * @param {num} racingRounds
   */
  async handleRaceRoundWinner(racingRounds) {
    try {
      updateView.printMessage(`\n 실행결과 \n`);
      await this.startRace(racingRounds);
      this.handleRaceWinner();
    } catch (error) {
      this.exit(error);
    }
  }

  startRace(racingRounds) {
    return new Promise((resolve, reject) => {
      try {
        while (this.gameCount < racingRounds) {
          this.gameTrack.setAdvanceCarsForward();
          this.gameCount++;

          updateView.printGameRace(this.gameTrack.gameStatus);
          updateView.printMessage("\n");
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  handleRaceWinner() {
    this.gameWinners.setGameWinners(this.gameTrack.gameStatus);
    updateView.printWinners(this.gameWinners.winners);

    this.endGame();
  }

  async exit(error) {
    updateView.printErrorMessage(error.message);

    try {
      const answer = await this.askQuestion("다시 시작하겠습니까? (yes/no):");

      if (answer.toLowerCase() === "yes" || !answer) {
        this.replayGame();
      } else {
        this.endGame();
      }
    } catch (error) {
      this.exit(error);
    }
  }

  replayGame() {
    this.gameTrack.gameStatus = [];
    this.gameWinners.winners = [];

    this.startGame();
  }

  endGame() {
    this.readline.close();
  }
}
