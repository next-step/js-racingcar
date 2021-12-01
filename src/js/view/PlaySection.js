import View from './View.js';

export default class PlaySection extends View {
  #template = /* html */ `
    <div id="playWrapper" class="mt-4 d-flex"></div>
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
