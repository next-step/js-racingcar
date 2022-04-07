export default class ResultSection extends HTMLElement {
  #template = /*html*/ `
    <section class="d-flex justify-center mt-5" data-props="result-section">
      <div>
        <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </section>
    `;

  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', this.#template);
  }
}

customElements.define('result-section', ResultSection);
