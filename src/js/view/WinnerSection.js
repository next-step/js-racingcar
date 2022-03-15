import View from './View.js';
import { $ } from '../util/dom.js';
import { ALERT } from '../util/constants.js';

export default class WinnerSection extends View {
  #template = /* html */ `
    <div>
      <h2 id="winner" class="text-center"></h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  `;

  constructor(el) {
    super(el);
    this.render();
    this.bindEvents();
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
    this.$winner = $('#winner');
  }

  renderWinner(winner) {
    this.$winner.textContent = `🏆 최종 우승자: ${winner} 🏆`;
  }

  triggerAlert() {
    alert(ALERT.CONGRATULATION_TEXT);
  }

  bindEvents() {
    this.$target.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('btn')) return;

      this.emit('@clickResetBtn');
    });
  }
}
