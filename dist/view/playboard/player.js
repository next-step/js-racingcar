import el from '../../util/dom.js';
import { View } from '../../viewConstructor.js';
export default class Player extends View {
    static #template = `<div class="mr-2"></div>`;
    $container;
    #scoreElems;
    #index;
    waitingEl = '<player-waiting>';
    forwardEl = '<player-forward>';
    constructor() {
        super();
        this.$container = el(Player.#template);
        this.#index = Number(this.getAttribute('index'));
        el(this, [this.$container]);
    }
    watch = ({ trial, processing, scores }) => {
        return { trial, processing, scores: scores[this.#index] };
    };
    connectedCallback() {
        super.connectedCallback();
        this.#scoreElems = [`<div class="car-player">${this.getAttribute('name')}</div>`];
        el(this.$container, this.#scoreElems);
    }
    onStoreUpdated({ trial: newTrial, processing: newPending, scores: newStatus }) {
        if (newTrial === 0) {
            this.#scoreElems = [`<div class="car-player">${this.getAttribute('name')}</div>`];
        }
        if (this.#scoreElems[this.#scoreElems.length - 1] === this.waitingEl) {
            this.#scoreElems.pop();
        }
        if (newPending && newTrial) {
            this.#scoreElems.push(this.waitingEl);
        }
        else if (newStatus && newStatus.filter(num => num >= 4).length === this.#scoreElems.length) {
            this.#scoreElems.push(this.forwardEl);
        }
        el(this.$container, this.#scoreElems);
    }
}
//# sourceMappingURL=player.js.map