import Template from '../Template.js';
import { CONTROLL_KEY, MAX_GAME_TRY_COUNT } from '../constants.js';
import { pipeline } from '../factory/index.js';
import { isNull, $element } from '../helpers/index.js';

const template = /*html*/ `
<section class="d-flex justify-center mt-5">
  <div>
    <form id="car-names-form">
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시 : EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" id="car-names" name="car-names" placeholder="예시) EAST, WEST, SOUTH, NORTH" autofocus required />
        <button type="submit" class="btn btn-cyan" id="car-names-confirm">확인</button>
      </div>
    </form>
    <form class="hidden" id="game-try-count-form">
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2" id="game-try-count" name="game-try-count" placeholder="시도 횟수" required min="1" max="${MAX_GAME_TRY_COUNT}" />
        <button type="submit" class="btn btn-cyan" id="game-try-count-confirm">확인</button>
      </div>
    </form>
  </div>
</section>`;

export default class InputSection extends Template {
  #carNames;
  #handler = [];

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  checkInputCarNames = event => {
    if (!event.target.matches('#car-names-form')) return;
    event.preventDefault();

    const parsedCarNames = pipeline(
      CONTROLL_KEY.CAR_NAMES,
      event.target.elements['car-names'].value,
    );

    if (isNull(parsedCarNames)) return;

    this.#carNames = parsedCarNames;
    pipeline(CONTROLL_KEY.CAR_NAMES_AFTER);
  };

  checkInputTryCount = event => {
    if (!event.target.matches('#game-try-count-form')) return;
    event.preventDefault();

    this.dispatch('inputted', {
      carNames: this.#carNames,
      tryCount: event.target.elements['game-try-count'].valueAsNumber,
    });

    pipeline(CONTROLL_KEY.TRY_COUNT_AFTER);
  };

  connectedCallback() {
    this.#handler = this.bindHandler([
      {
        type: 'submit',
        callback: this.checkInputCarNames,
      },
      {
        type: 'submit',
        callback: this.checkInputTryCount,
      },
    ]);
  }

  disconnectedCallback() {
    this.#handler();
  }
}

customElements.define('input-section', InputSection);
