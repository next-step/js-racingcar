class RacingStarter {
  constructor({ $target }) {
    this.$target = $target;
    this.isNameInputSubmit = false;
    this.renderNameInput();
    this.addEvent();
  }

  addEvent = () => {
    this.$target.addEventListener("click", ({ target }) => {
      if (target.closest("#name-submit-button")) {
        this.renderTryCountInput();
        this.isNameInputSubmit = true;
      }
    });

    this.$target.addEventListener("submit", e => {
      this.renderTryCountInput();
      this.isNameInputSubmit = true;

      e.preventDefault();
    });
  };

  renderNameInput = () => {
    const $template = ` <fieldset>
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <p>
      5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
      예시) EAST, WEST, SOUTH, NORTH
    </p>
    <div class="d-flex">
      <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
      <button type="button" class="btn btn-cyan" id="name-submit-button">확인</button>
    </div>
  </fieldset>`;

    this.$target.insertAdjacentHTML("beforeend", $template);
  };

  renderTryCountInput = () => {
    if (this.isNameInputSubmit) return;

    const $template = `
    <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
          <button type="button" class="btn btn-cyan" id="try-submit-button">확인</button>
        </div>
      </fieldset>
    `;
    this.$target.insertAdjacentHTML("beforeend", $template);
  };
}

export default RacingStarter;
