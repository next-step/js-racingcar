import { Component } from './component.js';

import { $name, $round } from '../views/selector.js';
import { NAME } from '../common/const.js';
import { CustomError, ERROR_MESSAGE, InputOutOfRangeError } from "../common/error.js";
import { disableButton, setFocus } from "../common/util.js";

export class NameComponent extends Component {
    constructor(stateService) {
        super(stateService);
        this._init();
    }

    _init() {
        super._init();
    }

    _setEventListeners() {
        $name.button.addEventListener('click', () => this.submit());
        $name.input.addEventListener('keyup', e => this.submitByEnterKey(e));
    }

    _setRemoveListeners() {
        $name.input.removeEventListener('keyup', e => this.submitByEnterKey(e));
    }

    submit() {
        const names = this.#setNames();

        if (!this.#IsValidated()) return;

        this._setRemoveListeners();
        this._stateService.renderState.renderRound = true;
        this._stateService.raceState.names = names;

        disableButton($name.button);
        setFocus($round.input);
    }

    submitByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.submit();
    }

    #setNames = () => {
        return $name.input.value.split(',').map(name => name.trim());
    }

    #IsValidated = () => {
        const names = this.#setNames();
        try {
            names.forEach(name => {
                if (name.length < NAME.MIN_RANGE || name.length > NAME.MAX_RANGE) {
                    throw new InputOutOfRangeError(ERROR_MESSAGE.InputOutOfRange);
                }
            });
            return true;
        } catch (e) {
            if (e instanceof CustomError) {
                alert(e.message);
            } else {
                throw e;
            }
        }
    }
}