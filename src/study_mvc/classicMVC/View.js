export default class View {
	constructor(controller) {
		this.controller = controller;
		this.heading = document.querySelector('#heading');
		this.heading.innerHTML = controller.getModelHeading();
		this.heading.addEventListener('click', controller);
	}
}
