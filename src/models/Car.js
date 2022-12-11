import RACING_GAME from "../constants.js";
import { getRandomNumberZeroToNine } from "../utils.js";

class Car {
  #name = "";
  #movementResult = 0;

  constructor(name) {
    this.$parent = document.getElementById("racing-section");

    this.#name = name.trim();
    this.$parent.insertAdjacentHTML("beforeend", this.templateCarName());
    this.$element = document.getElementById(`car-name-${this.name}`);
    this.$section = document.getElementById(`${this.name}-car-section`);
    this.$loading = document.getElementById(`${this.name}-loading`);
  }

  async onMovePer(racingCount) {
    const count = +racingCount;
    let movement = 0;

    this.$section.classList.remove("hide");

    for await (const index of [...Array(count)]) {
      this.$loading.classList.remove("hide");
      const res = await this.getRandom();
      this.$loading.classList.add("hide");

      if (res) {
        movement += 1;
        this.$element.insertAdjacentHTML(
          "afterend",
          this.templateMoveForward()
        );
      }
    }

    this.movementResult = movement;
    return movement;
  }

  getRandom() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        resolve(this.isMovable(getRandomNumberZeroToNine()));
        clearInterval(interval);
      }, 1000);
    });
  }

  isMovable(randomNumber) {
    return randomNumber >= RACING_GAME.CAR.MOVABLE_MIN_NUMBER;
  }

  get name() {
    return this.#name;
  }

  get movementResult() {
    return this.#movementResult;
  }

  set movementResult(movement) {
    this.#movementResult = movement;
  }

  // TODO 다음 step에서 역할 분리할 것
  templateCarName() {
    return `
            <div id="${this.name}-car-section" class="mr-2 hide">
              <div id="car-name-${this.name}" class="car-player">
                ${this.name}
              </div>
              ${this.templateLoading()}
            </div>
            `;
  }

  templateMoveForward() {
    return `<div class="forward-icon mt-2">⬇️️</div>`;
  }

  templateLoading() {
    return `
            <div id="${this.name}-loading" class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          `;
  }
}

export default Car;
