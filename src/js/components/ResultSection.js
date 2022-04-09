import { $template } from '../helpers/index.js';

const ResultSectionTemplate = winners =>
  $template(/*html*/ `
<section class="d-flex justify-center mt-5 hidden" name="result-section">
  <div>
    <h2>🏆 최종 우승자: ${winners} 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
</section>
`);

export default class ResultSection extends HTMLElement {
  #winners;

  constructor() {
    super();
  }

  connectedCallback() {
    const winners = document.querySelector('racing-app').getAttribute('winners');
    if (!winners) return;
    this.#winners = winners;
    this.insertAdjacentElement('afterbegin', ResultSectionTemplate(this.#winners));
    setTimeout(() => {
      alert(`축하합니다, ${winners}!`);
    }, 500);
  }
}

customElements.define('result-section', ResultSection);
