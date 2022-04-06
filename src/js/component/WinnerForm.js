export default class WinnerForm {
    constructor(winners) {
        this.winners = winners;
        this.$element = document.querySelector("#winner-area");
        this.#renderer();
        this.#mounted();
        this.onAlertWinner();
    }

    #renderer() {
        this.$element.innerHTML = this.#getWinnerTemplate();
    }

    #mounted() {
        document.querySelector("#reset-button").addEventListener("click", (event) => this.#onReset());
    }

    #onReset() {

    }

    #getWinnerTemplate() {
        return `
        <div>
          <h2>🏆 최종 우승자: ${this.winners.join(", ")} 🏆</h2>
          <div class="d-flex justify-center">
            <button id="reset-button" type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>`;
    }

    onAlertWinner() {
        setTimeout(() => {
            alert("축하합니다");
        }, 2000);
    }
}