import { $ } from "../util/querySelector.js";
import Car from "../models/Car.js";
import { delay, getRacingResult } from "../util/utils.js";
import ViewContorller from "./ViewController.js";
import {
  MAX_CAR_NAME_LENGTH,
  MIN_CAR_NAME_LENGTH,
  MESSAGE,
  MIN_RACING_COUNT,
  GAME_PROCESS_DELAY,
} from "../util/constant.js";

export let carNames;

export default class Controller {
  constructor() {
    this.cars = [];
    this.viewController = new ViewContorller();
    this.isGameFinished = false;
    this.getHTMLElements();
    this.addEventListenrs();
  }

  getHTMLElements() {
    this.$carNameInput = $("#car-name-input");
    this.$racingCountInput = $("#racing-count-input");

    this.$carNameSubmit = $("#car-name-submit");
    this.$racingCountSubmit = $("#racing-count-submit");
    this.$restartGame = $("#game-restart-button");
  }

  addEventListenrs() {
    this.$carNameSubmit.addEventListener("click", () =>
      this.handleCarNameInput()
    );

    this.$racingCountSubmit.addEventListener("click", () =>
      this.handleRacingCountInput()
    );
    this.$restartGame.addEventListener("click", () => this.handleRestart());
  }

  handleCarNameInput() {
    carNames = this.$carNameInput.value.split(",").map((car) => car.trim());

    if (carNames.every((carName) => carName.length < MIN_CAR_NAME_LENGTH)) {
      alert(MESSAGE.INVALID_NAME_LENGTH);
      this.$carNameInput.value = "";
      return;
    }

    if (carNames.every((carName) => carName.length > MAX_CAR_NAME_LENGTH)) {
      alert(MESSAGE.INVALID_NAME_LENGTH);
      this.$carNameInput.value = "";
      return;
    }
    this.cars = carNames.map((carName) => new Car(carName));
    this.viewController.renderInputBox();
  }

  handleRacingCountInput() {
    const racingCount = this.$racingCountInput.value;

    if (racingCount < MIN_RACING_COUNT) {
      this.$racingCountInput.value = "";
      alert(MESSAGE.INVALID_RACING_COUNT);
      return;
    }
    this.viewController.readyGameProcess(carNames);
    this.playGame(racingCount);
  }

  async playGame(racingCount) {
    if (!this.isGameReady) {
      return;
    }
    for (let i = 0; i < racingCount; i++) {
      await delay(GAME_PROCESS_DELAY);
      const racingResult = getRacingResult(this.cars.length);
      console.log(racingResult);
      this.moveCarAlongWith(racingResult);
      this.viewController.renderGameProgress(racingResult);
    }
    this.viewController.stopGameProgress();
    const winners = this.getWinners();
    this.viewController.renderGameResult(winners);
  }

  moveCarAlongWith(racingResult) {
    racingResult.forEach(
      (isMoving, index) => isMoving && this.cars[index].move()
    );
  }

  isGameReady() {
    return this.cars.length > 1 && this.racingCount > 0;
  }

  handleRestart() {
    this.cars = [];
    this.$carNameInput.value = "";
    this.$racingCountInput.value = "";
    this.viewController.clear();
  }

  getWinners() {
    const maxMoveCount = Math.max(
      ...this.cars.map(({ moveCount }) => moveCount)
    );

    return this.cars
      .filter(({ moveCount }) => moveCount === maxMoveCount)
      .map(({ name }) => name);
  }
}
