import RacingGame from "../models/RacingGame.js";
import RacingGameView from "../views/RacingGameView.js";
import RACING_GAME from "../constants.js";
import Car from "../models/Car.js";
import { insertElement } from "../utils.js";

class RacingGameController {
  #RacingGame;
  #RacingGameView;

  constructor() {
    this.#RacingGame = new RacingGame();
    this.#RacingGameView = new RacingGameView();

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.#RacingGameView.$racingGameForm.addEventListener(
      "submit",
      this.#onSubmitRacingCount.bind(this)
    );
    this.#RacingGameView.$carNamesButton.addEventListener(
      "click",
      this.#onSubmitCarNames.bind(this)
    );
    this.#RacingGameView.$resetButton.addEventListener(
      "click",
      this.#onClear.bind(this)
    );
  }

  #onSubmitCarNames(e) {
    e.preventDefault();

    const carNames = this.#RacingGameView.$carNamesInput.value;

    if (!this.isCarNamesCorrectlyRegistered(carNames)) {
      window.alert(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
      return;
    }

    this.#RacingGame.Cars = carNames
      .split(",")
      .map((carName) => new Car(this.#RacingGameView.$racingSection, carName));

    this.#RacingGameView.showElement(this.#RacingGameView.$racingCountFieldSet);
    this.#RacingGameView.disableElement(this.#RacingGameView.$carNamesInput);
    this.#RacingGameView.disableElement(this.#RacingGameView.$carNamesButton);
  }

  #onSubmitRacingCount(e) {
    e.preventDefault();

    const racingCount = this.#RacingGameView.$racingCountInput.value;

    if (!this.isRacingCountCorrectlyRegistered(racingCount)) {
      window.alert(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      return;
    }

    this.#RacingGame.racingCount = racingCount;
    this.#onRacingStart();
  }

  async #onRacingStart() {
    this.#RacingGameView.showElement(this.#RacingGameView.$racingSection);
    this.#RacingGameView.disableElement(this.#RacingGameView.$racingCountInput);
    this.#RacingGameView.disableElement(
      this.#RacingGameView.$racingCountButton
    );

    await Promise.all(
      this.#RacingGame.Cars.map(async (car) => {
        await car.onMovePer(this.#RacingGame.racingCount);
      })
    );

    this.#onRacingEnd();
  }

  #onRacingEnd() {
    const winnersCarNames = this.#RacingGame.winnerCars
      .map((Car) => Car.name)
      .join(", ");

    insertElement(this.#RacingGameView.$winnerSection).afterBegin(
      this.#RacingGameView.templateWinners(winnersCarNames)
    );
    this.#RacingGameView.showElement(this.#RacingGameView.$winnerSection);
  }

  #onClear() {
    this.#RacingGame.onClear();
    this.#RacingGameView.$racingGameForm.reset();

    this.#RacingGameView.enableElement(this.#RacingGameView.$carNamesInput);
    this.#RacingGameView.enableElement(this.#RacingGameView.$carNamesButton);

    this.#RacingGameView.hideElement(this.#RacingGameView.$racingCountFieldSet);
    this.#RacingGameView.enableElement(this.#RacingGameView.$racingCountInput);
    this.#RacingGameView.enableElement(this.#RacingGameView.$racingCountButton);

    // TODO 다른 API로 개선해보기
    this.#RacingGameView.$racingSection.innerHTML = "";
    this.#RacingGameView.$winnerSection.innerHTML = "";
    this.#RacingGameView.hideElement(this.#RacingGameView.$racingSection);
    this.#RacingGameView.hideElement(this.#RacingGameView.$winnerSection);
  }

  isCarNamesCorrectlyRegistered(carNames) {
    return carNames.split(",").every((carName) => {
      const name = carName.trim();
      return (
        this.isCarNameLessThanMaximum(name) &&
        this.isCardNameMoreThanMinimum(name)
      );
    });
  }

  isCardNameMoreThanMinimum(carName) {
    return RACING_GAME.CAR.NAME_LENGTH_MIN <= carName.length;
  }

  isCarNameLessThanMaximum(carName) {
    return carName.length <= RACING_GAME.CAR.NAME_LENGTH_MAX;
  }

  isRacingCountCorrectlyRegistered(count) {
    if (!count) {
      return false;
    }

    const racingCount = +count;

    return (
      RACING_GAME.RACING_COUNT_MIN <= racingCount &&
      racingCount <= RACING_GAME.RACING_COUNT_MAX
    );
  }
}

export default RacingGameController;
