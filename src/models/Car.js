import RACING_GAME from "../constants.js";
import { getRandomNumberZeroToNine, insertElement } from "../utils.js";

class Car {
  #name = "";
  #movementResult = 0;

  constructor($parent, name) {
    this.#name = name.trim();
    // $parent를 외부에서 주입받아서 beforeEnd로 무조건 처리하면 확장성이 좋지 않을거 같은데
    insertElement($parent).beforeEnd(this.initTemplate());

    this.$container = document.getElementById(`${this.name}-container`);
    this.$carName = document.getElementById(`car-name-${this.name}`);
    this.$loading = document.getElementById(`${this.name}-loading`);
  }

  initTemplate() {
    return `
      <div id="${this.name}-container" class="mr-2 hide">
        <span id="car-name-${this.name}" class="car-player">${this.name}</span>
        ${this.templateLoading()}      
      </div>
    `;
  }

  async onMovePer(racingCount) {
    const count = +racingCount;
    let movement = 0;

    this.$container.classList.remove("hide");

    for await (const index of [...Array(count)]) {
      this.$loading.classList.remove("hide");
      const res = await this.getRandom();
      this.$loading.classList.add("hide");

      if (res) {
        movement += 1;
        insertElement(this.$carName).afterEnd(this.templateMoveForward());
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

  templateMoveForward() {
    return `<div class="forward-icon mt-2">⬇️️</div>`;
  }

  templateLoading() {
    return `
            <div id="${this.name}-loading" class="d-flex justify-center mt-3 hide">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          `;
  }
}

export default Car;
