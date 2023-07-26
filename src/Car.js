class Car {
	constructor(name) {
		this.name = name;
		this.position = 0;
	}

	get getName() {
		return this.name;
	}

	get getPosition() {
		return this.position;
	}

	move(randomValue) {
		if (randomValue >= 4) {
			this.position += 1;
		}
	}
}

export default Car;
