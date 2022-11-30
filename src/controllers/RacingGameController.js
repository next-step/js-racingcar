import RacingGame from "../models/RacingGame.js";
import RacingGameView from "../views/RacingGameView.js";
import RACING_GAME from "../constants.js";

class RacingGameController {
  #model;
  #view;

  constructor() {
    this.#model = new RacingGame();
    this.#view = new RacingGameView();

    this.#subscribeEvents();
  }

  #subscribeEvents() {
    this.#view.$racingGameForm.addEventListener(
      "submit",
      this.#onSubmitRacingCount.bind(this)
    );
    this.#view.$carNamesButton.addEventListener(
      "click",
      this.#onSubmitCarNames.bind(this)
    );
  }

  #onSubmitCarNames(e) {
    e.preventDefault();

    if (!this.isCarNamesCorrectlyRegistered(this.#view.$carNamesInput.value)) {
      window.alert(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
      return;
    }

    this.#view.showElement(this.#view.$racingCountFieldSet);
  }

  #onSubmitRacingCount(e) {
    e.preventDefault();

    if (
      !this.isRacingCountCorrectlyRegistered(this.#view.$racingCountInput.value)
    ) {
      window.alert(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      return;
    }
  }

  isCarNamesCorrectlyRegistered(carNames) {
    return carNames
      .split(",")
      .every((carName) => this.isCarNameLessThanNameLimit(carName));
  }

  isCarNameLessThanNameLimit(carName) {
    return (
      RACING_GAME.CAR.NAME_LENGTH_MIN <= carName.length &&
      carName.length <= RACING_GAME.CAR.NAME_LENGTH_MAX
    );
  }

  isRacingCountCorrectlyRegistered(count) {
    const racingCount = +(count || "0");

    return (
      RACING_GAME.RACING_COUNT_MIN <= racingCount &&
      racingCount <= RACING_GAME.RACING_COUNT_MAX
    );
  }
}

export default RacingGameController;
