import { CarNames } from "../domain/CarNames.js";

export class CarNamesForm {
    $element;

    constructor(racing, { onLoadTryForm }) {
        this.racing = racing;
        this.$element = document.querySelector("#car-names-area");
        this.onLoadTryForm = onLoadTryForm;

        this.#renderer();
        this.#mounted();
        this.#setEvent();
    }

    #renderer() {
        this.$element.innerHTML = this.#getCarNamesTemplate();
    }

    #mounted() {
        this.$carNamesInput = document.querySelector("#car-names-input");
        this.$carNamesSubmit = document.querySelector("#car-names-submit");
    }

    #setEvent() {
        this.$carNamesInput.addEventListener("keyup", (event) => this.#onKeyupCarNames(event));
        this.$carNamesSubmit.addEventListener("click", () => this.#onCarNamesSubmit());
    }

    #onKeyupCarNames(event) {
        if (event.key === "Enter") {
            this.#onCarNamesSubmit();
        }
    }

    #onCarNamesSubmit() {
        this.racing.cars = new CarNames(this.$carNamesInput.value).cars;
        if (this.racing.cars.length > 0) {
            this.onLoadTryForm();
        }
    }

    #getCarNamesTemplate() {
        return `
        <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex">
            <input id="car-names-input" type="text" class="w-100 mr-2" placeholder="자동차 이름" />
            <button id="car-names-submit" type="button" class="btn btn-cyan">확인</button>
        </div>
        `;
    }
}
