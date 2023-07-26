import { SETTING } from "./constants/setting";

class CarRacingGame {
	constructor() {
		this.gameCount = 0;
		this.cars = [
			{
				name: "pobi",
				position: 5,
			},
			{
				name: "crong",
				position: 3,
			},
			{
				name: "honux",
				position: 1,
			},
		];
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

		return winner.name;
	}

	endGame() {
		console.log("게임 종료");
	}

	getRandomValue() {
		return Math.floor(Math.random() * 10);
	}
}

export default CarRacingGame;
