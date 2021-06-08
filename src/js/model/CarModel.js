export default class CarModel {
	constructor(name, index) {
		this.name = name;
		this.index = index;
		this.random = [];
	}

	getName() {
		return this.name;
	}

	getIndex() {
		return this.index;
	}

	getRandom() {
		return this.random;
	}

	setRandom(num) {
		this.random.push(num);
	}
}
