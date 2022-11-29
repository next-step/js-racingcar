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
      window.alert("!!");
      return;
    }

    this.#view.showElement(this.#view.$racingCountFieldSet);
  }

  #onSubmitRacingCount(e) {
    e.preventDefault();

    if (!this.isRacingCountRegistered(this.#view.$racingCountInput.value)) {
      window.alert("!!");
      return;
    }

    console.log("game start!");
  }

  //TOBE Regex로 만들어보자. ([a-zA-Z]{1,5}[,][\s])
  isCarNamesCorrectlyRegistered(carNames) {
    return carNames
      .split(",")
      .every((carName) => this.isCarNameLessThanNameLimit(carName));
  }

  isCarNameLessThanNameLimit(carName) {
    return carName.length <= RACING_GAME.CAR.NAME_LENGTH_LIMIT;
  }

  // TODO
  isRacingCountRegistered(count) {
    return count !== "";
  }
}

export default RacingGameController;
