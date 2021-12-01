import View from '../constructor.js';
export default class PlayerWaiting extends View {
    static #template = /* html */ `
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  `;
    constructor() {
        super();
        this.className = 'd-flex justify-center mt-3';
        this.render(PlayerWaiting.#template);
    }
}
customElements.define('racingcar-player-waiting', PlayerWaiting);
//# sourceMappingURL=playerWaiting.js.map