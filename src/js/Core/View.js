export default class View {
	constructor(controller) {
		this.controller = controller;
		this.controller.model.registerObserver(this);
		this.update(this.controller.model);
		this.addEvents();
	}

	addEvents = () => {};
	update = (model) => {};
}
