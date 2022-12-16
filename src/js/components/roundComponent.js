import { Component } from './component.js';

import { $round } from '../views/selector.js';
import { MIN_ROUND } from '../common/const.js';
import { CustomError, ERROR_MESSAGE, InputMinInsufficientError } from "../common/error.js";
import { disableButton, displayBlock, displayNone } from "../common/util.js";

export class RoundComponent extends Component {
    constructor(stateService) {
        super(stateService);
        this._init();
        this._subscribe();
    }

    _init() {
        super._init();
    }

    _setEventListeners() {
        $round.button.addEventListener('click', () => this.#submit());
        $round.input.addEventListener('keyup', e => this.#submitByEnterKey(e));
    }

    _initElement() {
        disableButton($round.button, false);
        displayNone($round.container);
    }

    _subscribe() {
        this._stateService.render.observers.push({ round: () => this.#render() });
        this._stateService.reset.observers.push({ resets: () => this._init() });
    }

    #submit() {
        try {
            this.#isValidated();
        } catch (e) {
            if (!e instanceof CustomError) {
                throw e;
            }
            return alert(e.message);
        }

        this._stateService.race.round = +$round.input.value;
        this._stateService.render.race = true;
        disableButton($round.button, true);
    }

    #submitByEnterKey(e) {
        if (e.key !== 'Enter' || this._stateService.render.race) return;
        e.preventDefault();
        this.#submit();
    }

    #render() {
        displayBlock($round.container);
    }

    #isValidated = () => {
        if (!$round.input.value || $round.input.value < MIN_ROUND) {
            throw new InputMinInsufficientError(ERROR_MESSAGE.InputMinInsufficient);
        }
    }
}