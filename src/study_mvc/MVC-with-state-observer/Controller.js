export default class Controller {
	constructor(model) {
		this.model = model;
	}

	handleEvent = function (e) {
		e.stopPropagation();
		switch (e.type) {
			case 'click':
				this.clickHasndler(e.target);
				break;
			default:
				console.log('클릭 이외의 이벤트: ', e);
		}
	};
	getModelHeading = function () {
		return this.model.heading;
	};
	clickHasndler = function (target) {
		this.model.changeHeading();
	};
}
