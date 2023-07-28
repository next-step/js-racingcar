import { SETTING } from "./constants/setting.js";

class CarRacingGame {
	constructor(cars) {
		this.gameCount = 0;
		this.cars = cars;
	}

	get getCarsStatus() {
		return this.cars
			.map((car) => `${car.name} : ${"-".repeat(car.position)}`)
			.join("\n");
	}

	get getWinner() {
		const maxPosition = this.cars.reduce(
			(max, { position }) => (max > position ? max : position),
			0
		);
		const winners = this.cars.filter(
			({ position }) => position === maxPosition
		);
		const winnerNames = winners.map(({ name }) => name).join(", ");

		return `${winnerNames}가 최종 우승했습니다.`;
	}
	get getRandomValue() {
		return Math.floor(Math.random() * 10);
	}

	increaseGame() {
		this.gameCount++;
		if (this.gameCount === SETTING.CAR_RACING_GAME_SETTING.ROUND_END) {
			this.endGame();
		}
	}

	endGame() {
		console.log("게임 종료");
	}
}

export default CarRacingGame;
