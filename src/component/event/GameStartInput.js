import Car from "../model/Car.js";

import template from "../../util/template.js";
import checkValidity from "../../util/checkValidity.js";

function getCarCountDOM() {
	const fieldset = template("fieldset");
	const p = template("p", { text: "시도할 횟수를 입력해주세요." });
	const div = template("div", { class: "d-flex" });

	const input = template("input", { class: "w-100 mr-2 car-count", placeholder: "시도 횟수", id:"input-count" });
	const button = template("button", { class: "btn btn-cyan", text: "확인", id:"submit-count", onClick: handleCountButtonClick.bind(this)});

	div.append(input, button);
	fieldset.append(p, div);

	return fieldset;
}

async function handleCountButtonClick(e) {
	e.preventDefault();
	const count = parseInt(document.querySelector('#input-count').value);
	this.setCount(count);
	await this.startGame();
} 

export function handleNameClick(e) {
	const names = checkValidity(document.querySelector('#input-name').value);
	if (names.length === 0) {
		alert("유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.");
		return;
	}

	const cars = names.map((name) => new Car(name));
	this.setCars(cars);

	const fieldset = getCarCountDOM.call(this);
	this.$GameStartForm.append(fieldset);
	return;
}

function handleNameInput(e, setCars) {
	if (e.keyCode === 13) {
		e.preventDefault();
		const names = checkValidity(e.target.value);
		if (names.length === 0) {
			alert("유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.");
			return;
		}

		const cars = names.map((name) => new Car(name));
		setCars(cars);

		const fieldset = getCarCountDOM();
		this.$GameStartForm.append(fieldset);
		return;
	}
}

async function handleCountInput(e, setCount, gameStart) {
	if (e.keyCode === 13) {
		e.preventDefault();
		const count = parseInt(e.target.value);
		setCount(count);
		await gameStart();
		return;
	}
}

async function onKeyInput(callback, e) {
	if (e.target.classList.contains("car-name")) {
		handleNameInput.call(this, e, callback[0]);
	} else if (e.target.classList.contains("car-count")) {
		await handleCountInput.call(this, e, callback[1], callback[2]);
	}
}

export default onKeyInput;
