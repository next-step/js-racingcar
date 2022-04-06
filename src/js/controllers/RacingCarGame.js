import { carGameResultView, racingCarGameView, tryCountFormView } from '../views/index.js';
import { CarModel, RacingCarGameModel } from '../models/index.js';
import { carNameValidator, tryCountValidator } from '../validators/index.js';

import { $ } from '../utils/dom.js';
import { pickNumberInRange } from '../utils/number.js';
import { DOM, GAME } from '../constants.js';

class RacingCarGame {
  constructor($target) {
    this.$target = $target;
    this.racingCarGameModel = new RacingCarGameModel();
    this.render();
    this.mounted();
    this.setEvent();
  }

  render() {
    this.$target.innerHTML = racingCarGameView();
  }

  mounted() {
    this.$carNamesInput = $(`#${DOM.CAR_NAMES_INPUT_ID}`);
    this.$carNamesForm = $(`#${DOM.CAR_NAMES_FORM}`);
    this.$carNamesInput.focus();
  }

  setEvent() {
    this.$carNamesForm.onsubmit = this.generateCarFromCarNameInput.bind(this);
  }

  generateCarFromCarNameInput(event) {
    event.preventDefault();
    const carNames = this.$carNamesInput.value;

    try {
      this.validateCarNames(carNames);
    } catch (error) {
      alert(error.message);
      this.$carNamesInput.focus();
      return;
    }

    this.generateCars(carNames);
    this.renderTryCountFormView();
  }

  validateCarNames(carNames) {
    carNameValidator.isEnteredCarNames(carNames);
    carNameValidator.isAllCarNamesHaveUnderFiveLetter(carNames);
  }

  generateCars(carNames) {
    const cars = carNames
      .split(GAME.CAR_NAME_SPLITTER)
      .map(carName => new CarModel(carName.trim()));
    this.racingCarGameModel.cars = cars;
  }

  renderTryCountFormView() {
    $(`#${DOM.TRY_COUNT_FORM_ID}`).innerHTML = tryCountFormView();
    this.$tryCountInput = $(`#${DOM.TRY_COUNT_INPUT_ID}`);
    this.$tryCountInput.focus();
    this.tryCountAddEvent();
  }

  tryCountAddEvent() {
    $(`#${DOM.TRY_COUNT_FORM_ID}`).onsubmit = this.progressRacingFromTryCount.bind(this);
  }

  progressRacingFromTryCount(event) {
    event.preventDefault();
    this.racingCarGameModel.tryCount = this.$tryCountInput.value;

    try {
      this.validateTryCount();
    } catch (error) {
      alert(error.message);
      this.$tryCountInput.focus();
      return;
    }

    this.progressRacingResult();
    this.renderGameResultView();
  }

  validateTryCount() {
    tryCountValidator.isEnteredTryCount(this.racingCarGameModel.tryCount);
    tryCountValidator.isOverThanZero(this.racingCarGameModel.tryCount);
  }

  progressRacingResult() {
    this.racingCarGameModel.cars.forEach(car => {
      car.gameResult = Array.from({ length: this.racingCarGameModel.tryCount }).map(() =>
        pickNumberInRange(GAME.CAR_FORWARD_MIN_CONDITION, GAME.CAR_FORWARD_MAX_CONDITION) >=
        GAME.CAR_FORWARD_STANDARD
          ? GAME.ADVANCE
          : GAME.STOP,
      );
    });
  }

  renderGameResultView() {
    $(`#${DOM.GAME_PROCESS_BOARD_ID}`).innerHTML = this.racingCarGameModel.cars
      .map(car => carGameResultView(car.name, car.gameResult))
      .join('');
  }
}

export default RacingCarGame;
