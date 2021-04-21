import { PROGRESS } from "../util/constant.js";
import { $ } from "../util/querySelector.js";

export default class CarView {
  constructor(name) {
    this.$progressSection = $("#game-process-div");
    this.$carView = document.createElement("div");
    this.$carView.innerHTML = `
      ${PROGRESS.CARNAME(name)}
      ${PROGRESS.WAIT} 
    `;
    this.$progressSection.hidden = false;

    this.$carName = this.$carView.querySelector(".car-player");
    this.$spinnerIcon = this.$carView.querySelector("#spinner-icon");
    this.$progressSection.append(this.$carView);
  }

  addForWardIcon() {
    this.$carName.insertAdjacentHTML("afterend", PROGRESS.MOVE);
  }

  showSpinnerIcon() {
    this.$spinnerIcon.hidden = false;
  }

  hideSpinnerIcon() {
    this.$spinnerIcon.hidden = true;
  }
}
