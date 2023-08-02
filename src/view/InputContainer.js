import { $ } from "../utils/selector.js";
import { createEl } from "../utils/createEl.js";

export default class InputContainer {
	constructor({ $target, $onSubmit }) {
		this.$inputContainer = createEl("div", "input-container");
		$target.appendChild(this.$inputContainer);
		this.$onSubmit = $onSubmit;

		this.render();
		this.registerEvent();
	}

	generateHTML() {
		return `
      <form>
        <label for="carNames">차 이름</label>
        <input type="text" id="carNames" placeholder="이름을 쉼표로 구분하여 입력해주세요." />
        <label for="rounds">시도할 횟수</label>
        <input type="number" id="rounds" placeholder="시도할 횟수를 입력해주세요." />
        <button id="startRace">시작</button>
      </form>
    `;
	}

	render() {
		this.$inputContainer.insertAdjacentHTML("beforeend", this.generateHTML());
	}

	registerEvent() {
		const $carNameInput = $("#carNames");
		const $roundsInput = $("#rounds");
		const $startSubmit = $("#startRace");

		$startSubmit.addEventListener("click", (e) => {
			e.preventDefault();

			const carNames = $carNameInput.value;
			const rounds = $roundsInput.value;
			this.$onSubmit(carNames, rounds);
		});

		$carNameInput.addEventListener("keyup", (e) => {
			e.preventDefault();

			if (e.key === "Enter") {
				const carNames = $carNameInput.value;
				const rounds = $roundsInput.value;
				this.$onSubmit(carNames, rounds);
			}
		});
	}
}
