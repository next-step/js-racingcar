export class Component {
    _view;
    _stateService;
    _validator;

    constructor(container) {
        this._view = container.view;
        this._stateService = container.stateService;
        this._validator = container.validator;
    }

    _setEventListeners() {}
    _setEventHandler() {}
    _initElement() {}
    _subscribe() {}
    _reset() {}

    _submitByEnterKey(e) {
        if (e.key !== 'Enter') return false;
        e.preventDefault();
        return true;
    }

    _init() {
        this._setEventListeners();
        this._setEventHandler();
        this._initElement();
        this._subscribe()
    }

}