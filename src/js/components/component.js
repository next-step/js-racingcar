import { ERROR_MESSAGE, NotAllowedInstanceOfAbstractError } from '../common/error.js';

export class Component {
    _stateService;

    constructor(stateService) {
        this._stateService = stateService;
        if (this.constructor === Component) {
            throw new NotAllowedInstanceOfAbstractError(ERROR_MESSAGE.NotAllowedInstanceOfAbstract);
        }
    }

    _setEventListeners() {}
    _setEventHandler() {}
    _setRemoveListeners() {}
    _initElement() {}
    _subscribe() {}

    _init() {
        this._setEventListeners();
        this._setEventHandler();
        this._initElement();
    }

}