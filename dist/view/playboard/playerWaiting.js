import { View } from '../../viewConstructor.js';
import el from '../../util/dom.js';
export default class PlayerWaiting extends View {
    static #template = `
  <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
  `;
    constructor() {
        super();
        el(this, [PlayerWaiting.#template]);
    }
}
//# sourceMappingURL=playerWaiting.js.map