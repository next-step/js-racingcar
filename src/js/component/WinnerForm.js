import Winner from "../domain/Winner.js";

const DELAY = 2000;

export default class WinnerForm {
    winners;

    constructor(props) {
        this.onReplay = props.onReplay;
        this.$element = document.querySelector("#winner-area");
    }

    render() {
        this.$element.innerHTML = this.#getWinnerTemplate();
    }

    mounted() {
        document.querySelector("#reset-button").addEventListener("click", (event) => this.onReset());
    }

    onReset() {
        this.onReplay();
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

    onLoadWinners(cars) {
        this.winners = Winner.getWinners(cars);
        this.render();
        this.mounted();
        this.onAlertWinner();
    }

    onAlertWinner() {
        setTimeout(() => {
            alert("축하합니다");
        }, DELAY);
    }

    reset() {
        this.$element.innerHTML = "";
        this.winners = [];
    }
}