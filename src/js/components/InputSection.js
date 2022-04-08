import validator from '../Validation.js';
import { isNull } from '../helpers/index.js';
import { MAX_GAME_TRY_COUNT } from '../constants.js';

export default class InputSection extends HTMLElement {
  #template = /*html*/ `
  <section class="d-flex justify-center mt-5">
    <form name="input-form">
      <fieldset name="car-names-field">
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
          5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        </p>
        <div class="d-flex">
          <input type="text" class="w-100 mr-2" name="car-names" placeholder="예시) EAST, WEST, SOUTH, NORTH" autofocus required />
          <button type="click" class="btn btn-cyan" name="car-names-confirm">확인</button>
        </div>
      </fieldset>
      <fieldset class="hidden" name="game-try-count-field">
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" name="game-try-count" placeholder="시도 횟수" required min="1" max="${MAX_GAME_TRY_COUNT}" />
          <button type="submit" class="btn btn-cyan" name="game-try-count-confirm">확인</button>
        </div>
      </fieldset>
    </form>
  </section>`;

  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', this.#template);
  }

  connectedCallback() {
    this.addEventListener('click', this.checkInputCarNames);
    this.addEventListener('submit', this.checkInputTryCount);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.checkInputCarNames);
    this.removeEventListener('submit', this.checkInputTryCount);
  }

  checkInputCarNames = event => {
    if (!event.target.matches('[name="car-names-confirm"]')) return;
    event.preventDefault();
    const { value } = document.querySelector('[name="car-names"]');
    const parsedCarNames = validator('carNames', value);
    if (isNull(parsedCarNames)) return;
    document.querySelector('[name="game-try-count-field"]').classList.remove('hidden');
    console.log(document.querySelector('racing-app'));
    document.querySelector('racing-app').setAttribute('car-names', parsedCarNames);
  };

  checkInputTryCount = event => {
    event.preventDefault();
    document.querySelector('[name="game-section"]').classList.remove('hidden');
    document
      .querySelector('racing-app')
      .setAttribute('try-count', event.target.elements['game-try-count'].valueAsNumber);
  };
}

customElements.define('input-section', InputSection);
