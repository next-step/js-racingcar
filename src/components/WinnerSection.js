import Component from "../core/Component.js";

export default class WinnerSection extends Component {
  template() {
    return /*html*/ `<div>
    <h2 class="winners-message"></h2>
        <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
    </div>`;
  }

  mounted() {
    const winnersMsg = this.$props.winners.join(",");
    const $winnerMsg = document.querySelector(".winners-message");
    $winnerMsg.innerHTML = `🏆 최종 우승자: ${winnersMsg} 🏆`;
  }
}
