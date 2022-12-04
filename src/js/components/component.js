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
    _setRemoveListeners() {}
    _initElement() {}
    _subscribe() {}
    _reset() {}
    _submit() {}

    _submitByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this._submit();
    }

    _init() {
        this._setEventListeners();
        this._setEventHandler();
        this._initElement();
        this._subscribe()
    }

}