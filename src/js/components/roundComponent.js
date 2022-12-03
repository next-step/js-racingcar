import { Component } from "./component.js";
import { $round } from "../views/selector.js";
import { VALIDATIONTYPE } from "../common/const.js";

export class roundComponent extends Component {
    constructor(container) {
        super(container);
        this._init();
    }

    _init() {
        super._init();
    }

    _setEventListeners() {
        $round.button.addEventListener('click', () => this._submit());
        $round.input.addEventListener('keyup', e => this._submitByEnterKey(e));
    }

    _initElement() {
        this._view.displayNone([$round.container]);
    }

    _subscribe() {
        this._stateService.observers.push({ renderRound: () => this.#render() });
    }

    _submit() {
        if (!this._validator.validate(VALIDATIONTYPE.ROUND, $round.input.value)) return;

        this._stateService.renderRace = true;

        this._view.disableButton($round.button);
    }

    _submitByEnterKey(e) {
        super._submitByEnterKey(e);
    }

    #render() {
        this._view.displayBlock([$round.container]);
    }
}