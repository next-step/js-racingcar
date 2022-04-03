import Car from './models/Car.mjs';

import { carGameResultView } from './views/Car.js';
import { racingCarGameView } from './views/RacingCarGame.js';
import { tryCountFormView } from './views/TryCount.js';

import { $ } from './utils/dom.js';
import { pickRandomNumberBetweenZeroToNine } from './utils/index.js';
import { DOM, ERROR_MESSAGE, GAME } from './constants.js';

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
      this.isEnteredCarNames(carNames);
      this.isUnderFiveLetterCarNames(carNames);
      $(`#${DOM.TRY_COUNT_FIELD_SET_ID}`).innerHTML = tryCountFormView();
      carNames.split(', ').forEach(carName => this.cars.push(new Car(carName)));
      this.tryCountAddEvent();
    } catch (error) {
      alert(error.message);
    }
  }

  isEnteredCarNames(carNames) {
    if (!carNames) throw new Error(ERROR_MESSAGE.CAR_NAMES_REQUIRED);
  }

  isUnderFiveLetterCarNames(carNames) {
    const enteredCarNames = carNames.split(', ');
    const carNamesUnderFiveLetters = enteredCarNames.filter(i => i.length <= 5);
    if (carNamesUnderFiveLetters.length !== enteredCarNames.length)
      throw new Error(ERROR_MESSAGE.INVALID_CAR_NAMES);
  }

  tryCountAddEvent() {
    this.$tryCountInput = $(`#${DOM.TRY_COUNT_INPUT_ID}`);
    this.$tryCountSubmitButton = $(`#${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}`);

    this.$tryCountSubmitButton.onclick = this.onClickTryCountSubmitButton.bind(this);
  }

  onClickTryCountSubmitButton() {
    const tryCount = this.$tryCountInput.value;

    try {
      this.isOverThanZero(tryCount);

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

  isOverThanZero(tryCount) {
    if (tryCount <= 0) throw new Error(ERROR_MESSAGE.INVALID_TRY_COUNT);
  }
}

export default RacingCarGame;
