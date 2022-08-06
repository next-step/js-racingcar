import View from "./View.js";

class ResultRacingView extends View {
  setElement(e) {}

  initView() {}

  resultView(winners) {
    document.querySelector("#app").insertAdjacentHTML(
      "beforeend",
      `<section class="d-flex justify-center mt-5">
        <div>
          <h2>🏆 최종 우승자: ${winners} 🏆</h2>
        </div>
      </section>`
    );
  }
}
export default ResultRacingView;
