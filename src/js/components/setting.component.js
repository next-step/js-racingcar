import { $carName, $raceTurn } from "../views/selector.js";
import { Component } from "./component.js";

export class SettingComponent extends Component {
    constructor(container) {
        super(container);
        this._init();
    }

    _init() {
        super._init();
    }

    _setEventListeners() {
        $carName.button.addEventListener('click', () => this.#submitNames());
        $carName.input.addEventListener('keyup', e => this.#submitNamesByEnterKey(e));
    }

    _initElement() {
        this._view.displayNone([$raceTurn.container]);
    }

    #submitNames() {
        const names = this.#setNames();
        if (!this._validator.validateCarNames(names)) return;
        this._view.displayBlock([$raceTurn.container]);
        this._view.disableButton($carName.button);
    }

    #submitNamesByEnterKey(e) {
        if (!super._submitByEnterKey(e)) return;
        this.#submitNames();
    }

    #setNames = () => {
        return $carName.input.value.split(',').map(name => name.trim());
    }
}