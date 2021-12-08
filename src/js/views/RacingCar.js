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

  getTotalDistance() {
    return this.#runningDistance.length;
  }

  run(runCount) {
    // console.log(`${this.tag} ${this.#name}: run!!`);
    this.#runCount = runCount;

    if (this.isRunForward()) {
      this.#runningDistance.push("FORWARD");
    }
    this.renderProgress();
  }

  isRunForward() {
    return Math.floor(Math.random() * 10) >= 4;
  }

  renderProgress() {
    // console.log(this.#runCount, this.#runningDistance);

    this.replaceChildren();

    /* html */
    const html = `
    <div class="mr-2">
      <div class="car-player">${this.#name}</div>
      ${this.#runningDistance.map(v =>
        `<div class="forward-icon mt-2">⬇️️</div>`).join("")
      }
      ${this.#runCount <= 0 ? "" : this.printSpinner()}
    </div>
    `;

    this.insertAdjacentHTML("afterbegin", html);
  }

  printSpinner() {
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