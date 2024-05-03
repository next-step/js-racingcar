import Car from './Car';

class Race {
	#competitors;
	#playNumber;

	constructor(competitors) {
		this.car = new Car();
		this.#competitors = competitors;
		this.#playNumber = 0;
	}

	start() {
		if (this.car.name >= 5) {
			throw new Error('자동차 이름은 5글자를 넘을 수 없습니다!');
		}
		for (let i = 0; i < 5; i++) {
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
