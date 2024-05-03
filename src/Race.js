import Car from './Car';

const car = new Car();

class Race {
	#competitors;
	#playNumber;

	constructor(competitors) {
		this.#competitors = competitors;
		this.#playNumber = 0;
	}

	start() {
		if (car.name >= 5) {
			return;
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
		const winners = this.#competitors.filter(
			competitor => competitor.position === highestPosition
		);
		return winners.map(winner => winner.name).join(', ');
	}

	getHighest() {
		return Math.max(
			...this.#competitors.map(competitor => competitor.position)
		);
	}
}

export default Race;
