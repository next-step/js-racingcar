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
    this.$carNamesForm.onsubmit = this.onClickSubmitButton.bind(this);
  }

  onClickSubmitButton(event) {
    event.preventDefault();
    const carNames = this.$carNamesInput.value;

    if (!this.validateCarNames(carNames)) return;

    this.generateCars(carNames);
    this.renderTryCountFormView();
    this.tryCountAddEvent();
  }

  validateCarNames(carNames) {
    try {
      carNameValidator.isEnteredCarNames(carNames);
      carNameValidator.isAllCarNamesHaveUnderFiveLetter(carNames);
    } catch (error) {
      alert(error.message);
      this.$carNamesInput.focus();
      return false;
    }
    return true;
  }

  generateCars(carNames) {
    const cars = carNames.split(', ').map(carName => new CarModel(carName));
    this.racingCarGameModel.cars = cars;
  }

  renderTryCountFormView() {
    $(`#${DOM.TRY_COUNT_FORM_ID}`).innerHTML = tryCountFormView();
    this.$tryCountInput = $(`#${DOM.TRY_COUNT_INPUT_ID}`);
    this.$tryCountInput.focus();
  }

  tryCountAddEvent() {
    $(`#${DOM.TRY_COUNT_FORM_ID}`).onsubmit = this.onClickTryCountSubmitButton.bind(this);
  }

  onClickTryCountSubmitButton(event) {
    event.preventDefault();
    this.racingCarGameModel.tryCount = this.$tryCountInput.value;

    if (!this.validateTryCount()) return;

    this.progressRacingResult();
    this.renderGameResultView();
  }

  validateTryCount() {
    try {
      tryCountValidator.isEnteredTryCount(this.racingCarGameModel.tryCount);
      tryCountValidator.isOverThanZero(this.racingCarGameModel.tryCount);
    } catch (error) {
      alert(error.message);
      this.$tryCountInput.focus();
      return false;
    }
    return true;
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
