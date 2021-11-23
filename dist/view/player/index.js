import el from '../../util/dom.js';
import View from '../constructor.js';
import { Boundaries } from '../../constants.js';
export default class Player extends View {
    #scoreElems;
    #index;
    #nameEl;
    #waitingElString = '<racingcar-player-waiting>';
    #forwardElString = '<racingcar-player-forward>';
    constructor() {
        super();
        this.className = 'mr-2';
        this.#index = Number(this.getAttribute('index'));
        this.#nameEl = el(`<racingcar-player-name>${this.getAttribute('name')}</racingcar-player-name>`);
    }
    watch = ({ trial, processing, scores }) => {
        return { trial, processing, scores: scores[this.#index] };
    };
    connectedCallback() {
        super.connectedCallback();
        this.#scoreElems = [this.#nameEl];
        el(this, this.#scoreElems);
    }
    onStoreUpdated({ trial: newTrial, processing: newPending, scores: newStatus }) {
        if (newTrial === 0) {
            this.#scoreElems = [this.#nameEl];
        }
        if (this.#scoreElems[this.#scoreElems.length - 1] === this.#waitingElString) {
            this.#scoreElems.pop();
        }
        if (newPending && newTrial) {
            this.#scoreElems.push(this.#waitingElString);
        }
        else if (newStatus &&
            newStatus.filter(num => num >= Boundaries.ForwardCutOff).length === this.#scoreElems.length) {
            this.#scoreElems.push(this.#forwardElString);
        }
        el(this, this.#scoreElems);
    }
}
//# sourceMappingURL=index.js.map