import View from '../constructor.js';
import el from '../../util/dom.js';
export default class PlayerWaiting extends View {
    static #template = /* html */ `
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  `;
    constructor() {
        super();
        this.className = 'd-flex justify-center mt-3';
        el(this, [PlayerWaiting.#template]);
    }
}
customElements.define('racingcar-player-waiting', PlayerWaiting);
//# sourceMappingURL=playerWaiting.js.map