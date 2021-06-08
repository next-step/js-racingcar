export default class CarController {
	constructor(carModel, carView) {
		this.model = carModel;
		this.view = carView;
	}

	getModel() {
		return this.model;
	}

	checkRandom(num) {
		this.model.setRandom(num);

		if (num >= 4) {
			this.view.renderForward();
		}
	}

	getForwardNum() {
		return this.model.getRandom().filter((num) => num >= 4).length;
	}
}
