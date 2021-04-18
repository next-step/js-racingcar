import GameStartInput from "./GameStartInput.js";

import onKeyInput from "./event/GameStartInput.js";

function Game() {
	this.cars = [];
	this.count = 0;

	this.$GameStartForm = document.querySelector("form");
	this.setCars = (updatedCars) => {
		this.cars = updatedCars;
	};
	this.setCount = (updatedCount) => {
		this.count = updatedCount;
	};

	new GameStartInput({
		target: this.$GameStartForm,
		onKeyInput: onKeyInput.bind(this, [this.setCars, this.setCount])
	});
}
export default Game;
