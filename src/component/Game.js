import GameStartInput from "./GameStartInput.js";
import CarRacing from "./CarRacing.js";
import WinnerBoard from "./WinnerBoard.js";

import onKeyInput, { handleNameClick } from "./event/GameStartInput.js";

import refineName from "../util/refineName.js";

function Game() {
	this.cars = [];
	this.count = 0;
	this.goRound = 1;
	this.intervalId = 0;
	this.maxPosition = 0;

	this.$GameStartForm = document.querySelector("form");
	this.setCars = (updatedCars, finished) => {
		this.cars = updatedCars;
		if (this.count !== 0) {
			this.carRacing.setCars(updatedCars, finished);
		}
	};
	this.setCount = (updatedCount) => {
		this.count = updatedCount;
	};
	this.$CarRacing = document.querySelector(".mt-4.d-flex.car-racing-board");
	this.$WinnerBoard = document.querySelector(".winner-board");

	this.wait = () => {
		return new Promise((res) => {
			setTimeout(() => {
				res();
			}, 1000);
		});
	};

	this.processGame = async () => {
		while (this.goRound <= this.count) {
			await this.wait();
			this.cars.forEach((car) => {
				car.moveForward();
				this.maxPosition = Math.max(this.maxPosition, car.position);
			});
			if (this.goRound === this.count) {
				this.setCars([...this.cars], true);
			} else {
				this.setCars([...this.cars], false);
			}
			this.goRound++;
		}
	};

	this.checkWinner = () => {
		const winners = [];
		this.cars.forEach((car) => {
			if (car.position === this.maxPosition) {
				winners.push(car.name);
			}
		});

		return winners;
	};

	this.startGame = async () => {
		await this.processGame();
		const winners = this.checkWinner();
		const stringifiedWinner = refineName(winners);
		this.winnerBoard.setWinners(winners);
		setTimeout(() => alert("🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇"), 2000);
	};

	new GameStartInput({
		target: this.$GameStartForm,
		onKeyInput: onKeyInput.bind(this, [this.setCars, this.setCount, this.startGame]),
		button: document.querySelector('#submit-name'),
		onClick: handleNameClick.bind(this)
	});

	this.carRacing = new CarRacing(this.$CarRacing);
	this.winnerBoard = new WinnerBoard(this.$WinnerBoard);
}
export default Game;
