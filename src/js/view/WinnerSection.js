import View from './View.js';

export default class WinnerSection extends View {
  #template = /* html */ `
    <div id="winnerWrapper"></div>
  `;

  constructor(el) {
    super(el);
    this.render();
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
  }
}
