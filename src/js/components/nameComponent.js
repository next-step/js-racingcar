import { Component } from './component.js';

import { $name, $round } from '../views/selector.js';
import { VALIDATIONTYPE } from '../common/const.js';

export class nameComponent extends Component {
    constructor(container) {
        super(container);
        this._init();
    }

    _init() {
        super._init();
    }

    _setEventListeners() {
        $name.button.addEventListener('click', () => this._submit());
        $name.input.addEventListener('keyup', e => this._submitByEnterKey(e));
    }

    _setRemoveListeners() {
        $name.input.removeEventListener('keyup', e => this._submitByEnterKey(e));
    }

    _submit() {
        const names = this.#setNames();

        if (!this._validator.validate(VALIDATIONTYPE.NAME, names)) return;

        this._setRemoveListeners();
        this._stateService.renderRound = true;
        this._stateService.race.names = names;

        this._view.disableButton($name.button);
        this._view.setFocus($round.input);
    }

    _submitByEnterKey(e) {
        super._submitByEnterKey(e);
    }

    #setNames = () => {
        return $name.input.value.split(',').map(name => name.trim());
    }
}