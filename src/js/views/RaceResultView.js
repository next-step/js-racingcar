import View from './View.js';
import { INFO_MESSAGES } from '../constants/index.js';

class RaceResultView extends View {
  tag = "[RaceResultView]";

  init() {
    this.on("click", this.clickHandler);
  }

  clickHandler = ({target}) => {
    if (target.type === "button") {
      this.emit("restart");
    }
  }

  congrats() {
    setTimeout(() => {
      window.alert(INFO_MESSAGES.CONGRATS);
    }, 2000);
  }
  
  renderResult(result) {
    this.replaceChildren();

    /* html */
    const html = `
    <section class="d-flex justify-center mt-5">
      <div>
        <h2>🏆 최종 우승자: ${this.getWinners(result)} 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </section>
    `;

    this.insertAdjacentHTML("afterbegin", html);

    return this;
  }

  getWinners(result) {
    return result
      .sort((a, b) => b.totalDistance - a.totalDistance)
      .reduce((prev, current) => {
        if (prev.length === 0 || prev[0].totalDistance === current.totalDistance) {
          prev.push(current);
        }
        return prev;
      }, [])
      .map(({ name }) => name)
      .join(',');
  }
}

customElements.define("race-result-view", RaceResultView);

export default RaceResultView;
