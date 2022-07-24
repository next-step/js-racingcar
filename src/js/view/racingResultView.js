import Observable from "../util/observable.js";

import { $ } from "../util/dom.js";
import { notifyTypes } from "../util/constants.js";

const racingResultTemplate = (winners) => /* html */ `
    <section class="d-flex justify-center mt-5">
        <div>
            <h2>🏆 최종 우승자: ${winners} 🏆</h2>
            <div class="d-flex justify-center">
                <button type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
        </div>
    </section>
`;

class RacingResultView {
  $app;

  constructor() {
    this.$app = $("#app");

    this.bindInitialObserver();
  }

  bindInitialObserver() {
    Observable.subscribe(notifyTypes.GET_RACE_RESULT, this.attachRacingResultPannel);
  }

  attachRacingResultPannel = (winners) => {
    const winnersAsStr = winners.join(", ");

    this.$app.insertAdjacentHTML("beforeEnd", racingResultTemplate(winnersAsStr));
  };
}

export default RacingResultView;
