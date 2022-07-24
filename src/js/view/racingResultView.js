import Observable from "../util/observable.js";
import RacingResultController from "../controller/racingResultController.js";

import { $ } from "../util/dom.js";
import { notifyTypes } from "../util/constants.js";

const racingResultTemplate = (winners) => /* html */ `
    <section id="race-result-section" class="d-flex justify-center mt-5">
        <div>
            <h2>🏆 최종 우승자: ${winners} 🏆</h2>
            <div class="d-flex justify-center">
                <button id="race-reset-btn" type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
        </div>
    </section>
`;

class RacingResultView {
  $app;
  $racingResultSection;
  $raceResetBtn;

  constructor() {
    this.racingResultController = RacingResultController;

    this.$app = $("#app");

    this.bindInitialObserver();
  }

  bindInitialObserver() {
    Observable.subscribe(notifyTypes.GET_RACE_RESULT, this.attachRacingResultPannel);
    Observable.subscribe(notifyTypes.RESET_RACE, this.dettachRacingResultPannel);
  }

  onRaceResetBtnClick = () => {
    this.racingResultController.handleRaceReset();
  };

  attachRacingResultPannel = (winners) => {
    const winnersAsStr = winners.join(", ");
    this.$app.insertAdjacentHTML("beforeEnd", racingResultTemplate(winnersAsStr));

    this.$racingResultSection = $("#race-result-section");
    this.$raceResetBtn = $("#race-reset-btn");
    this.$raceResetBtn.addEventListener("click", this.onRaceResetBtnClick);
  };

  dettachRacingResultPannel = () => {
    this.$app.removeChild(this.$racingResultSection);
  };
}

export default RacingResultView;
