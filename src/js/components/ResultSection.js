import Template from '../Template.js';
import { RESULT_ALERT_DELAY } from '../constants.js';
import { $element } from '../helpers/index.js';

const template = /*html*/ `
<section class="d-flex justify-center mt-5 hidden" name="result-section">
  <div>
    <h2>🏆 최종 우승자: <span id="winners"></span> 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" id="game-reset" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
</section>`;

export default class ResultSection extends Template {
  #handler = [];

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  gameReset = event => {
    if (!event.target.matches('#game-reset')) return;
    this.dispatch('reset');
  };

  static get observedAttributes() {
    return ['winners'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue) return this.firstElementChild.classList.add('hidden');

    this.firstElementChild.classList.remove('hidden');
    const winners = this.getAttribute('winners');
    document.getElementById('winners').textContent = winners;
    // prettier-ignore
    setTimeout(() => alert(`이번 레이싱 게임의 승자는\n\n${winners} 입니다!\n\n✨축하해요✨`), RESULT_ALERT_DELAY);
  }

  connectedCallback() {
    this.#handler = this.bindHandler([
      {
        type: 'click',
        callback: this.gameReset,
      },
    ]);
  }

  disconnectedCallback() {
    this.#handler();
  }
}

customElements.define('result-section', ResultSection);
