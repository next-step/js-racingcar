import { DOM, ERROR_MESSAGE } from './constants.js';
import { $ } from './utils/dom.js';

class RacingCarGame {
  constructor($target) {
    this.$target = $target;
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
        </form>
      </section>
    `;
  }
}

export default RacingCarGame;
