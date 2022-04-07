import { ERROR_MESSAGE } from "../constant/index.js";

const RacingInputView = {
  renderNameInput: function () {
    const $template = ` <fieldset>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <p>
      5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
      예시) EAST, WEST, SOUTH, NORTH
    </p>
    <div class="d-flex">
      <input type="text" class="w-100 mr-2" id ="input-name" placeholder="자동차 이름" required oninvalid="this.setCustomValidity('${ERROR_MESSAGE.NAME_EMPTY}')" autocomplete="off"/>
      <button type="button" class="btn btn-cyan" id="name-submit-button">확인</button>
    </div>
  </fieldset>`;

    this.renderInContainer($template);
  },

  renderTryCountInput: function () {
    const $template = `
    <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" autocomplete="off"/>
          <button type="button" class="btn btn-cyan" id="try-submit-button">확인</button>
        </div>
      </fieldset>
    `;

    this.renderInContainer($template);
  },

  renderInContainer: $template => {
    const $racingInputContainer = document.querySelector("#racing-form");
    $racingInputContainer.insertAdjacentHTML("beforeend", $template);
  },
};

export default RacingInputView;
