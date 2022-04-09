import { DOM } from '../constants.js';
import { $ } from '../utils/dom.js';

class RacingCarGameView {
  constructor(target) {
    this.$target = target;
    this.render();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    this.$carNamesInput = $(`#${DOM.CAR_NAMES_INPUT_ID}`);
  }

  focusCarNamesInput() {
    this.$carNamesInput.focus();
  }

  template() {
    return String.raw`
      <section class="d-flex justify-center mt-5">
        <div>
          <form id="${DOM.CAR_NAMES_FORM}">
            <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
            <p>
              5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
              예시) EAST, WEST, SOUTH, NORTH
            </p>
            <div class="d-flex">
              <input
                id="${DOM.CAR_NAMES_INPUT_ID}"
                type="text"
                class="w-100 mr-2"
                placeholder="자동차 이름"
              />
              <button id="${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}" type="submit" class="btn btn-cyan">
                확인
              </button>
            </div>
          </form>
          <form id="${DOM.TRY_COUNT_FORM_ID}"></form>
        </div>
      </section>
      <section class="d-flex justify-center mt-5">
        <div id="${DOM.GAME_PROCESS_BOARD_ID}" class="mt-4 d-flex"></div>
      </section>
      <section id="${DOM.GAME_END_SECTION_ID}" class="d-flex justify-center mt-5"></section>
    `;
  }
}

export default RacingCarGameView;
