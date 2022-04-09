import validator from '../Validation.js';
import { isNull, $template } from '../helpers/index.js';
import { CONTROLL_KEY, MAX_GAME_TRY_COUNT } from '../constants.js';

const InputSectionTemplate = $template(/*html*/ `
<section class="d-flex justify-center mt-5">
  <div>
    <form name="car-names-field">
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시 : EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" name="car-names" placeholder="예시) EAST, WEST, SOUTH, NORTH" autofocus required />
        <button type="click" class="btn btn-cyan" name="car-names-confirm">확인</button>
      </div>
    </form>
    <form class="hidden" name="game-try-count-field">
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2" id="game-try-count" name="game-try-count" placeholder="시도 횟수" required min="1" max="${MAX_GAME_TRY_COUNT}" />
        <button type="submit" class="btn btn-cyan" name="game-try-count-confirm">확인</button>
      </div>
    </form>
  </div>
</section>`);

export default class InputSection extends HTMLElement {
  #carNames;

  constructor() {
    super();
  }

  connectedCallback() {
    this.insertAdjacentElement('afterbegin', InputSectionTemplate);

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
    const parsedCarNames = validator(CONTROLL_KEY.CAR_NAMES, value);
    if (isNull(parsedCarNames)) return;
    document.querySelector('[name="game-try-count-field"]').classList.remove('hidden');
    this.#carNames = parsedCarNames;
    setTimeout(() => {
      document.getElementById('game-try-count').focus();
    }, 100);
  };

  checkInputTryCount = event => {
    event.preventDefault();
    document
      .querySelector('racing-app')
      .setAttribute('try-count', event.target.elements['game-try-count'].valueAsNumber);
    document.querySelector('racing-app').setAttribute('car-names', this.#carNames);
  };
}

customElements.define('input-section', InputSection);
