import Observable from "../util/observable.js";

import { notifyTypes } from "../util/constants.js";
import { $ } from "../util/dom.js";

const racingProcessWrapperTemplate = (children) => /* html */ `
    <section id="race-process-section" class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
            ${children}
        </div>
    </section>
`;

const carInfoTempalte = (carName, ...children) => /* html */ `
    <div class="mr-2">
        <div class="car-player">${carName}</div>
        ${children.join("")}
    </div>
`;

const moveArrowTemplate = /* html */ `
    <div class="forward-icon mt-2">⬇️️</div>
`;

const moveWatingSpinner = /* html */ `
  <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
`;

class RacingProcessView {
  $app;
  $raceProcessSection;

  constructor() {
    this.$app = $("#app");

    this.bindInitialObserver();
  }

  bindInitialObserver() {
    Observable.subscribe(notifyTypes.PROCESS_RACE, this.attachRacingProcessPanel, this);
    Observable.subscribe(notifyTypes.RESET_RACE, this.dettachRacingProcessPanel);
  }

  renderMovedDistance(dist) {
    return Array.from({ length: dist }, () => moveArrowTemplate).join("");
  }

  renderRacingProcess(entries, movingDistPerCar) {
    const $racingProcessStatus = entries
      .map((carName, idx) => {
        const curCarMovedDist = movingDistPerCar[idx];
        const $movedDistance = this.renderMovedDistance(curCarMovedDist);
        return carInfoTempalte(carName, $movedDistance, moveWatingSpinner);
      })
      .join("");

    return racingProcessWrapperTemplate($racingProcessStatus);
  }

  attachRacingProcessPanel = (entries, movingDistPerCar) => {
    this.$app.insertAdjacentHTML("beforeEnd", this.renderRacingProcess(entries, movingDistPerCar));

    this.$raceProcessSection = $("#race-process-section");
  };

  dettachRacingProcessPanel = () => {
    this.$app.removeChild(this.$raceProcessSection);
  };
}

export default RacingProcessView;
