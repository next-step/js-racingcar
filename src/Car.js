import { NUMBER_FOR_MOVE } from './constant';

class Car {
	name;
	position = 0;

	constructor(name) {
		this.name = name;
	}

	move() {
		const randomValue = Math.floor(Math.random() * 10);
		if (randomValue >= NUMBER_FOR_MOVE) {
			this.position += 1;
			console.log(`${this.name}: ${'-'.repeat(this.position)}`);
		}
	}

	get name() {
		return this.name;
	}

	get position() {
		return this.position;
	}
}

export default Car;
