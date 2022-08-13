import { SELECTORS } from "../utils/constants/selectors.js";
import { validateNumRange, validateNameLength } from "../utils/validation.js";
import { $, $$ } from "../utils/dom.js";
import { removeHiddenClass, getRandomInt } from "../utils/utils.js";
import {
  createTemplateCarPlayer,
  createTemplateResult,
} from "../view/template.js";
import { templateForward } from "../view/template.js";

export class RacingModel {
  constructor() {
    this.carNames = [];
    this.playTime = 0;
    this.movingCount = [];
    this.winners = [];
  }

  #isAbleToMoveForward = () => {
    const randomNum = getRandomInt(1, 10);
    return randomNum > 4;
  };

  #displayTemplateForward = ($racingCarNames) => {
    $racingCarNames.forEach((racingcar) => {
      if (this.#isAbleToMoveFoward()) {
        racingcar.insertAdjacentHTML("afterend", templateForward);
      }
    });
  };

  #removeSpinners = ($spinners) => {
    $spinners.forEach(($el) => {
      $el.style.willChange = "auto";
      $el.style.opacity = 0;
    });
  };

  setCarNames($carNames) {
    this.carNames = [];

    const arr = $carNames.split(",");
    for (let i = 0; i < arr.length; i++) {
      try {
        validateNameLength(arr[i]);
        this.carNames.push(arr[i]);
        removeHiddenClass($(SELECTORS.COUNT_SECTION));
        $(SELECTORS.COUNT_INPUT).focus();
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    this.movingCount = Array.from({ length: $carNames.length }, () => 0);
  }

  setPlayTime($count) {
    try {
      validateNumRange($count);
      this.playTime = $count;
      removeHiddenClass($(SELECTORS.GAME_SECTION));
      this.startRacingGame(Number($count));
    } catch (error) {
      alert(error.message);
    }
  }

  displayCars() {
    $(SELECTORS.CAR_PLAYER_WRAPPER_DIV).insertAdjacentHTML(
      "beforeend",
      createTemplateCarPlayer(this.carNames)
    );
  }

  moveCars() {
    Array.from({ length: this.playTime }, () => {
      this.carNames.forEach((name, idx) => {
        if (this.#isAbleToMoveForward()) {
          this.movingCount[idx] += 1;
        }
      });
    });
  }

  setWinners() {
    const max = Math.max(...this.movingCount);
    console.log(...this.movingCount);
    this.winners = this.carNames.filter(
      (name, idx) => this.movingCount[idx] === max
    );
  }

  showWinners() {
    const winners = createTemplateResult(this.winners.join());
    $(SELECTORS.RESULT_SECTION).insertAdjacentHTML("beforeend", winners);
    removeHiddenClass($(SELECTORS.RESULT_SECTION));
  }

  startRacingGame($count) {
    let cnt = 1;

    const timeoutId = setInterval(() => {
      this.#displayTemplateForward($$(SELECTORS.CAR_DIV_NAME));

      if (cnt++ === $count) {
        clearInterval(timeoutId);
        this.moveCars();
        this.#removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
        this.setWinners();
        this.showWinners();
        setTimeout(() => {
          alert("🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇");
        }, 2000);
      }
    }, 1000);
  }
}
