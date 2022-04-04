import { carGameResultView, racingCarGameView, tryCountFormView } from '../views/index.js';
import { CarModel, RacingCarGameModel } from '../models/index.js';
import { carNameValidator, tryCountValidator } from '../validators/index.js';

import { $ } from '../utils/dom.js';
import { pickRandomNumberBetweenZeroToNine } from '../utils/index.js';
import { DOM, GAME } from '../constants.js';

class RacingCarGame {
  constructor($target) {
    this.$target = $target;
    this.racingCarGameModel = new RacingCarGameModel();
    this.cars = [];
    this.render();
    this.setEvent();
  }

  render() {
    this.$target.innerHTML = racingCarGameView();
    this.mounted();
  }

  mounted() {
    this.$carNamesInput = $(`#${DOM.CAR_NAMES_INPUT_ID}`);
    this.$carNamesSubmitButton = $(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`);
  }

  setEvent() {
    this.$carNamesSubmitButton.onclick = this.onClickSubmitButton.bind(this);
  }

  onClickSubmitButton() {
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
      return false;
    }
    return true;
  }

  generateCars(carNames) {
    const cars = carNames.split(', ').map(carName => new CarModel(carName));
    this.racingCarGameModel.cars = cars;
  }

  renderTryCountFormView() {
    $(`#${DOM.TRY_COUNT_FIELD_SET_ID}`).innerHTML = tryCountFormView();
  }

  tryCountAddEvent() {
    $(`#${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}`).onclick = this.onClickTryCountSubmitButton.bind(this);
  }

  onClickTryCountSubmitButton() {
    this.racingCarGameModel.tryCount = $(`#${DOM.TRY_COUNT_INPUT_ID}`).value;

    if (!this.validateTryCount()) return;

    this.progressRacingResult();
    this.renderGameResultView();
  }

  validateTryCount() {
    try {
      tryCountValidator.isOverThanZero(this.racingCarGameModel.tryCount);
    } catch (error) {
      alert(error.message);
      return false;
    }
    return true;
  }

  progressRacingResult() {
    this.racingCarGameModel.cars.forEach(car => {
      car.gameResult = Array.from({ length: this.racingCarGameModel.tryCount }).map(() =>
        pickRandomNumberBetweenZeroToNine() > GAME.CAR_FORWARD_STANDARD ? GAME.ADVANCE : GAME.STOP,
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
