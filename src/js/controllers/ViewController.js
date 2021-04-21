import { MESSAGE } from "../util/constant.js";
import { $ } from "../util/querySelector.js";
import CarView from "../views/Carview.js";

export default class ViewContorller {
  constructor() {
    this.carViews = [];
    this.$gameprogressDiv = $("#game-process-div");
    this.$gameResultSection = $("#game-result-section");
    this.$gameProgressSection = $(".game-progress-container");
  }

  renderInputBox() {
    this.controlView("#racing-count-section");
    this.controlDisable("#car-name-submit");
  }

  readyGameProcess(carNames) {
    this.controlDisable("#racing-count-submit");
    this.carViews = carNames.map((carName) => new CarView(carName));
    this.carViews.forEach((carView) => carView.showSpinnerIcon());
  }

  renderGameProgress(racingResult) {
    racingResult.forEach((canMove, index) => {
      if (!canMove) return;
      console.log(index);
      this.carViews[index].addForWardIcon();
    });
  }

  renderGameResult(winners) {
    const winnersName = winners.join(", ");
    this.controlView("#game-result-section");
    this.$gameResultSection.insertAdjacentHTML(
      "afterbegin",
      `<h1>🏆 최종 우승자: ${winnersName} 🏆</h1>`
    );

    setTimeout(() => alert(MESSAGE.CELEBRATION), 2000);
  }

  stopGameProgress() {
    this.carViews.forEach((carView) => carView.hideSpinnerIcon());
  }

  controlView(target) {
    $(target).hidden = false;
  }

  controlDisable(target) {
    $(target).disabled = true;
  }

  controlAble(target) {
    $(target).disabled = false;
  }

  turnOffView(target) {
    $(target).hidden = true;
  }

  clear() {
    this.carViews = [];
    this.$gameResultSection.innerText = "";
    this.$gameProgressSection.innerHTML = "";
    this.$gameprogressDiv.innerText = "";
    this.turnOffView("#racing-count-section");
    this.controlAble("#car-name-submit");
    this.controlAble("#racing-count-submit");
  }
}
