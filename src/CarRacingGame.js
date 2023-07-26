import { SETTING } from "./constants/setting.js";

class CarRacingGame {
	constructor(cars) {
		this.gameCount = 0;
		this.cars = cars;
	}

	increaseGame() {
		this.gameCount++;
		if (this.gameCount === SETTING.CAR_RACING_GAME_SETTING.ROUND_END) {
			this.endGame();
		}
	}

	getCarsStatus() {
		return this.cars
			.map((car) => `${car.name} : ${"-".repeat(car.position)}`)
			.join("\n");
	}

	getWinner() {
		const winner = this.cars.reduce((acc, cur) => {
			if (acc.position < cur.position) {
				return cur;
			}
			return acc;
		});

		return `${winner.name}가 최종 우승했습니다.`;
	}

	endGame() {
		console.log("게임 종료");
	}

	getRandomValue() {
		return Math.floor(Math.random() * 10);
	}
}

export default CarRacingGame;
