
import { $ } from "./utils.js";

export default class Car {
  #raceStatus = $(".", "race-status");
  raceCarElement;

  constructor(name) {
    this.name = name;
    this.progressLength = 0;
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

    this.raceCarElement = raceCarElement;
  }

  renderCarElement() {
    this.createCarElement();
    this.#raceStatus.insertAdjacentElement("beforeend", this.raceCarElement);
  }
}
