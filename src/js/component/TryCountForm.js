import TryCount from "../domain/TryCount.js";

export default  class TryCountForm {
    constructor(racing, { onLoadCarTrackForm }) {
        this.racing = racing;
        this.$element = document.querySelector("#try-count-area");
        this.onLoadCarTrackForm = onLoadCarTrackForm;
    }

    render() {
        this.$element.innerHTML = this.#getTryCountTemplate();
    }
    mounted() {
        this.tryCountInput = document.querySelector("#try-count-input");
        this.tryCountsubmit = document.querySelector("#try-count-submit");
        
        this.tryCountInput.addEventListener("keyup", (event) => this.#onTryCountInputKeyup(event));
        this.tryCountsubmit.addEventListener("click", () => this.#onTryCountSubmit());
    }

    #onTryCountInputKeyup(event) {
        if(event.key === "Enter") {
            this.#onTryCountSubmit();
        }
    }

    #onTryCountSubmit() {
        try {
            this.racing.tryCount = new TryCount(this.tryCountInput.value).value;
            this.onLoadCarTrackForm();
        } catch (error) {
            alert(error.message);
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

    disabled() {
        this.tryCountInput.setAttribute("disabled", "disabled");
        this.tryCountsubmit.setAttribute("disabled", "disabled");
    }

    display() {
        this.$element.classList.remove("d-none");
    }

    reset() {
        this.$element.innerHTML = "";
        this.racing.tryCount = 0;
    }
}