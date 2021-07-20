import CarModel from './CarModel.js';
import CarView from '../view/CarView.js';
import CarController from '../controller/CarController.js';

export default class RacingModel {
	constructor() {
		this.cars = [];
		this.tryNum = 0;
		this.winners = [];
	}

	getCars() {
		return this.cars;
	}

	setCars(names) {
		this.cars = names.map((name, i) => {
			const carModel = new CarModel(name, i);
			const carView = new CarView(carModel);
			const carController = new CarController(carModel, carView);

			return carController;
		});
	}

	getTryNum() {
		return this.tryNum;
	}

	setTryNum(num) {
		this.tryNum = num;
	}

	getWinners() {
		return this.winners;
	}

	setWinners(winners) {
		this.winners = [...winners];
	}

	retry() {
		this.cars = [];
		this.tryNum = 0;
		this.winners = [];
	}
}
