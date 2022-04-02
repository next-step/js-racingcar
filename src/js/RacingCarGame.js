import Car from './models/Car.mjs';

import { carView } from './views/Car.js';

import { $ } from './utils/dom.js';
import { DOM, ERROR_MESSAGE } from './constants.js';

class RacingCarGame {
  constructor($target) {
    this.$target = $target;
    this.cars = [];
    this.render();
    this.setEvent();
  }

  render() {
    this.$target.innerHTML = this.template();
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
      $(`#${DOM.TRY_COUNT_FIELD_SET_ID}`).innerHTML = this.tryCountTemplate();
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

  template() {
    return String.raw`
      <section class="d-flex justify-center mt-5">
        <form>
          <fieldset>
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input id="${DOM.CAR_NAMES_INPUT_ID}" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
              <button id="${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}" type="button" class="btn btn-cyan">확인</button>
            </div>
          </fieldset>
          <fieldset id="${DOM.TRY_COUNT_FIELD_SET_ID}"></fieldset>
        </form>
      </section>
      <section class="d-flex justify-center mt-5">
        <div id="${DOM.GAME_PROCESS_BOARD_ID}" class="mt-4 d-flex"></div>
      </section>
      <section id="${DOM.GAME_RESULT_SECTION_ID}" class="d-flex justify-center mt-5"></section>
    `;
  }

  tryCountTemplate() {
    return String.raw`
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input id="${DOM.TRY_COUNT_INPUT_ID}" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
        <button id="${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}" type="button" class="btn btn-cyan">확인</button>
      </div>
    `;
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
      $(`#${DOM.GAME_PROCESS_BOARD_ID}`).innerHTML = this.cars
        .map(car => carView(car.name))
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
