export class TryCountForm {
    constructor() {
        this.$element = document.querySelector("#try-count-area");
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
        this.tryCountsubmit.addEventListener("click", () => this.#onTryCountSubmit());
    }

    #onTryCountSubmit() {
        console.log(this.tryCountInput);
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

    toggleDisplay() {
        this.$element.classList.toggle("d-none");
    }
}
