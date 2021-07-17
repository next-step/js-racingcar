export default class HeadingView {
	constructor(controller) {
		this.controller = controller;
		this.heading = document.querySelector('#heading');
		this.controller.model.registerObserver(this);
		this.update();
	}
	update = function (model = this.controller.model) {
		this.heading.innerHTML = model.heading;
	};
}
