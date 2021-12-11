import View from './View.js';

class RacingCar extends View {
  tag = "[RacingCar]";
  #name;
  #runCount;
  #runningDistance = [];

  init() {
    this.#name = this.getAttribute("name");
  }

  get name() {
    return this.#name;
  }

  setRunCount(runCount) {
    this.#runCount = runCount;
    return this;
  }

  getTotalDistance() {
    return this.#runningDistance.length;
  }

  run() {
    if (this.isRunForward()) {
      this.#runningDistance.push("FORWARD");
    }

    this.replaceChildren();
    this.insertAdjacentHTML("afterbegin", this.render());
  }

  isRunForward() {
    return Math.floor(Math.random() * 10) >= 4;
  }

  render() {
    /* html */
    return `
    <div class="mr-2">
      <div class="car-player">${this.getAttribute("name")}</div>
      ${this.#runningDistance.map(v =>
      `<div class="forward-icon mt-2">⬇️️</div>`).join("")
      }
      ${this.renderSpinner()}
    </div>
    `;
  }

  renderSpinner() {
    if (this.#runCount === 0) return "";
    /* html */
    return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
    `;
  }
}

customElements.define("racing-car", RacingCar);

export default RacingCar;
