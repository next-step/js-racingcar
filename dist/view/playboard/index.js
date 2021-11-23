import el from '../../util/dom.js';
import { View } from '../../viewConstructor.js';
export default class Playboard extends View {
    static #template = `<div class="mt-4 d-flex">`;
    $container;
    constructor() {
        super();
        this.$container = el(Playboard.#template);
        el(this, [this.$container]);
    }
    watch = ({ cars }) => ({ cars });
    onStoreUpdated({ cars }) {
        const $entries = cars?.length
            ? cars.map((name, i) => el(`<car-player name=${name} index=${i} >`))
            : [];
        el(this.$container, $entries);
    }
}
//# sourceMappingURL=index.js.map