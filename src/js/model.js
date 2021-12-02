import { raceResult } from "./view.js";
import { getRandomNumber } from "./utils.js";
import { RACE_NUMBER } from "./constants.js";

export default class Car {
  #raceStatus = raceResult.raceStatus;
  #raceCarElement;

  constructor(name) {
    this.name = name;
    this.progressLength = 0;
    this.tryCount = 0;
  }

  createCarElement() {
    const raceCarElement = document.createElement("div");
    raceCarElement.classList.add("mr-2");
    raceCarElement.innerHTML = `
        <div class="car-player">${this.name}</div>
          <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
              <span class="material spinner"></span>
          </div>
        </div>
    `;

    this.#raceCarElement = raceCarElement;
  }

  renderCarElement() {
    this.createCarElement();
    this.#raceStatus.insertAdjacentElement("beforeend", this.#raceCarElement);
  }

  renderArrowElement() {
    const arrowElement = this.#raceCarElement.querySelector(".d-flex");

    arrowElement.outerHTML = `
      <div class="forward-icon mt-2">⬇️️</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `;
  }

  renderRemoveProcess() {
    const arrowElement = this.#raceCarElement.querySelector(".d-flex");

    arrowElement.innerHTML = ``;
  }

  isGoForward() {
    return getRandomNumber(RACE_NUMBER.MIN, RACE_NUMBER.MAX) >= 4;
  }

  progressRacing(tryCount) {
    let tempTryCount = 1;

    while (tempTryCount < tryCount) {
      if (this.isGoForward()) {
        this.progressLength += 1;
        this.renderArrowElement();
      }

      tempTryCount++;
    }

    this.renderRemoveProcess();
  }
}
