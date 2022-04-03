import Car from './models/Car.mjs';

import { carGameResultView, racingCarGameView, tryCountFormView } from './views/index.js';
import { carNameValidator, tryCountValidator } from './validators/index.js';

import { $ } from './utils/dom.js';
import { pickRandomNumberBetweenZeroToNine } from './utils/index.js';
import { DOM, GAME } from './constants.js';

class RacingCarGame {
  constructor($target) {
    this.$target = $target;
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
    this.validateCarNames();
  }

  validateCarNames() {
    const carNames = this.$carNamesInput.value;

    try {
      carNameValidator.isEnteredCarNames(carNames);
      carNameValidator.isAllCarNamesHaveUnderFiveLetter(carNames);
      $(`#${DOM.TRY_COUNT_FIELD_SET_ID}`).innerHTML = tryCountFormView();
      carNames.split(', ').forEach(carName => this.cars.push(new Car(carName)));
      this.tryCountAddEvent();
    } catch (error) {
      alert(error.message);
    }
  }

  tryCountAddEvent() {
    this.$tryCountInput = $(`#${DOM.TRY_COUNT_INPUT_ID}`);
    this.$tryCountSubmitButton = $(`#${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}`);

    this.$tryCountSubmitButton.onclick = this.onClickTryCountSubmitButton.bind(this);
  }

  onClickTryCountSubmitButton() {
    const tryCount = this.$tryCountInput.value;

    try {
      tryCountValidator.isOverThanZero(tryCount);

      this.cars.forEach(car => {
        car.gameResult = Array.from({ length: tryCount }).map(() =>
          pickRandomNumberBetweenZeroToNine() > 3 ? GAME.ADVANCE : GAME.STOP,
        );
      });

      $(`#${DOM.GAME_PROCESS_BOARD_ID}`).innerHTML = this.cars
        .map(car => carGameResultView(car.name, car.gameResult))
        .join('');
    } catch (error) {
      alert(error.message);
    }
  }
}

export default RacingCarGame;
