import RACING_GAME from "../constants.js";
import { getRandomNumberZeroToNine } from "../utils.js";

class Car {
  #name = "";
  racingCount = 0;
  #movementResult = 0;

  constructor(name) {
    this.#name = name.trim();
  }

  onMovePer(racingCount) {
    this.racingCount = +racingCount;

    this.onMove();
  }

  onMove() {
    let movement = 0;
    [...new Array(this.racingCount)].forEach(() => {
      if (this.isMovable(getRandomNumberZeroToNine())) {
        movement += 1;
      }
    });

    this.movementResult = movement;
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
            <div class="mr-2">
              <div id="car-name-${this.name}" class="car-player">${this.name}</div>
            </div>
            `;
  }

  templateMoveForward() {
    return `<div class="forward-icon mt-2">⬇️️</div>`;
  }

  templateLoading() {
    return `
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
          `;
  }
}

export default Car;
