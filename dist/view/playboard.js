import el from '../util/dom.js';
import View from './constructor.js';
export default class Playboard extends View {
    constructor() {
        super();
        this.className = 'mt-4 d-flex';
    }
    watch = ({ cars }) => ({ cars });
    onStoreUpdated({ cars }) {
        if (!cars.length)
            this.hide();
        else {
            const $entries = cars.length
                ? cars.map((name, i) => el(`<racingcar-player name=${name} index=${i}>`))
                : [];
            el(this, $entries);
            this.show();
        }
    }
}
//# sourceMappingURL=playboard.js.map