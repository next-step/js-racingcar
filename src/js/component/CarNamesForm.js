import CarNames from "../domain/CarNames.js";

<<<<<<< HEAD
    constructor({ onLoadTryForm }) {
=======
export default class CarNamesForm {
    constructor(racing, { onLoadTryForm }) {
        this.racing = racing;
>>>>>>> minsiki
        this.$element = document.querySelector("#car-names-area");
        this.carNames = new CarNames();
        this.onLoadTryForm = onLoadTryForm;

        this.#renderer();
        this.#mounted();
    }

    #renderer() {
        this.$element.innerHTML = this.#getCarNamesTemplate();
    }

    #mounted() {
        this.$carNamesInput = document.querySelector("#car-names-input");
        this.$carNamesSubmit = document.querySelector("#car-names-submit");

<<<<<<< HEAD
    #setEvent() {
        this.$carNamesInput.addEventListener("keyup", () => this.#onKeyupCarNames());
=======
        this.$carNamesInput.addEventListener("keyup", (event) => this.#onKeyupCarNames(event));
>>>>>>> minsiki
        this.$carNamesSubmit.addEventListener("click", () => this.#onCarNamesSubmit());
    }

    #onKeyupCarNames() {
        console.log(this.$carNamesInput.value);
    }

    #onCarNamesSubmit() {
        this.carNames.names = this.$carNamesInput.value;
        this.onLoadTryForm();
        // let carNamesState = this.carNames.getCarNamesState();
        // if (!carNamesState.isComplte) {
        //     alert(carNamesState.message);
        // }
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

    disabled() {
        this.$carNamesInput.setAttribute("disabled", "disabled");
        this.$carNamesSubmit.setAttribute("disabled", "disabled");
    }
}
