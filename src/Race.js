import Car from './Car';
import { MAX_CAR_NAME_LENGTH } from './constant';

class Race {
	#competitors;
	#playNumber;

	constructor(competitors) {
		this.car = new Car();
		this.#competitors = competitors;
		this.#playNumber = 0;
	}

	start() {
		if (this.car.name >= MAX_CAR_NAME_LENGTH) {
			throw new Error('자동차 이름은 5글자를 넘을 수 없습니다!');
		}
		for (let i = 0; i < MAX_CAR_NAME_LENGTH; i++) {
			this.#playNumber += 1;
		}
	}

	get playNumber() {
		return this.#playNumber;
	}

	get winner() {
		const highestPosition = this.getHighest();
		return this.#competitors
			.filter(competitor => competitor.position === highestPosition)
			.map(winner => winner.name)
			.join(', ');
	}

	getHighest() {
		return Math.max(
			...this.#competitors.map(competitor => competitor.position)
		);
	}
}

export default Race;
