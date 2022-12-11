export class Component {
    _stateService;

    constructor(stateService) {
        this._stateService = stateService;
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
        this._subscribe()
    }

}