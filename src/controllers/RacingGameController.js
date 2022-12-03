import RacingGame from "../models/RacingGame.js";
import RacingGameView from "../views/RacingGameView.js";
import RACING_GAME from "../constants.js";
import Car from "../models/Car.js";

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

    const carNames = this.#view.$carNamesInput.value;

    if (!this.isCarNamesCorrectlyRegistered(carNames)) {
      window.alert(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
      return;
    }

    this.#model.Cars = carNames.split(",").map((carName) => new Car(carName));
    this.#view.showElement(this.#view.$racingCountFieldSet);
  }

  #onSubmitRacingCount(e) {
    e.preventDefault();

    const racingCount = this.#view.$racingCountInput.value;

    if (!this.isRacingCountCorrectlyRegistered(racingCount)) {
      window.alert(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      return;
    }

    this.#model.racingCount = racingCount;
    this.#onRacingStart();
  }

  #onRacingStart() {
    this.#model.Cars.forEach((Car) => {
      Car.onRacingStart(this.#model.racingCount);
    });

    this.#view.$racingSection.innerHTML = this.#view.templateRacingSection(
      this.#model.Cars
    );
    this.#view.showElement(this.#view.$racingSection);
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
