export default class InputSection extends HTMLElement {
  #template = /*html*/ `
  <section class="d-flex justify-center mt-5">
    <form data-props="input-form">
      <fieldset data-props="car-names-field">
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
          예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex">
          <input type="text" class="w-100 mr-2" placeholder="자동차 이름" data-props="car-names-input" />
          <button type="button" class="btn btn-cyan" data-props="car-names-confirm-button">확인</button>
        </div>
      </fieldset>
      <fieldset class="hidden" data-props="game-try-count-field">
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" data-props="game-try-count-input" />
          <button type="button" class="btn btn-cyan" data-props="game-try-count-confirm-button">확인</button>
        </div>
      </fieldset>
    </form>
  </section>`;

  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', this.#template);
  }
}

customElements.define('input-section', InputSection);
