import template from "../util/template.js";

function makeSpinnerDOM() {
	const container = template("div", { class: "d-flex justify-center mt-3" });
	const div = template("div", { class: "relative spinner-container" });
	const span = template("span", { class: "material spinner" });

	div.append(span);
	container.append(div);

	return container;
}

function makeCarDOM(name, count, finished) {
	const container = template("div", { class: "mr-2" });
	const carName = template("div", { class: "car-player", text: name });

	const moves = [];
	for (let i = 0; i < count; i++) {
		const move = template("div", { class: "forward-icon mt-2", text: "⬇️" });
		moves.push(move);
	}

	const spinner = finished ? template("div") : makeSpinnerDOM();

	container.append(carName, ...moves, spinner);
	return container;
}

function CarRacing(target) {
	this.setCars = (updatedCars, finished) => {
		this.render(updatedCars, finished);
	};

	this.render = (updatedCars, finished) => {
		target.innerHTML = "";

		const carDOMs = updatedCars.map((car) => makeCarDOM(car.name, car.position, finished));
		target.append(...carDOMs);
	};
}

export default CarRacing;
