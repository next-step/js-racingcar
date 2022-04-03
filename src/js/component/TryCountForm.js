import { TryCount } from "../domain/TryCount.js";

export class TryCountForm {
    constructor(racing, { onLoadCarTrackForm }) {
        this.racing = racing;
        this.$element = document.querySelector("#try-count-area");
        this.onLoadCarTrackForm = onLoadCarTrackForm;
        this.#renderer();
        this.#mounted();
        this.#setEvent();
    }

    #renderer() {
        this.$element.classList.add("d-none");
        this.$element.innerHTML = this.#getTryCountTemplate();
    }
    #mounted() {
        this.tryCountInput = document.querySelector("#try-count-input");
        this.tryCountsubmit = document.querySelector("#try-count-submit");
    }

    #setEvent() {
        this.tryCountInput.addEventListener("keyup", (event) => this.#onTryCountInputKeyup(event));
        this.tryCountsubmit.addEventListener("click", () => this.#onTryCountSubmit());
    }

    #onTryCountInputKeyup(event) {
        if(event.key === "Enter") {
            this.#onTryCountSubmit();
        }
    }

    #onTryCountSubmit() {
        this.racing.tryCount = new TryCount(this.tryCountInput.value).value;
        if (this.racing.tryCount > TryCount.MIN_COUNT) {
            this.onLoadCarTrackForm();
        }
    }

    #getTryCountTemplate() {
        return `
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
            <input id="try-count-input" type="number" class="w-100 mr-2" placeholder="시도 횟수" />
            <button id="try-count-submit" type="button" class="btn btn-cyan">확인</button>
        </div>
        `;
    }

    display() {
        this.$element.classList.remove("d-none");
    }
}
