export default class Controller {
	constructor(model) {
		this.model = model;
	}
	get model() {
		return this._model;
	}
	set model(args) {
		this._model = args;
	}
}
