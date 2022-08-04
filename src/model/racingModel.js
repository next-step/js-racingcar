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
    this.count = 0;
    this.movingCount = [];
    this.winners = [];
  }

  #isAbleToMoveFoward = () => {
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

    $carNames.split(",").forEach(($name) => {
      try {
        validateNameLength($name);
        this.carNames.push($name);
      } catch (error) {
        alert(error.message);
      }
    });

    this.movingCount = Array.from({ length: $carNames.length }, () => 0);
  }

  setCount($count) {
    try {
      validateNumRange($count);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.count = $count;
  }

  displayCars() {
    $(SELECTORS.CAR_PLAYER_WRAPPER_DIV).insertAdjacentHTML(
      "beforeend",
      createTemplateCarPlayer(this.carNames)
    );
  }

  startRacingGame($count) {
    let cnt = 1;

    const timeoutId = setInterval(() => {
      this.#displayTemplateForward($$(SELECTORS.CAR_DIV_NAME));

      if (cnt++ === $count) {
        clearInterval(timeoutId);
        this.getRacingResult();
        this.#removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
        this.showGameResult();
        setTimeout(() => {
          alert("🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇");
        }, 2000);
      }
    }, 1000);
  }

  getRacingResult() {
    const max = Math.max(...this.movingCount);
    this.winners = this.carNames.filter(
      (name, idx) => this.movingCount[idx] === max
    );
  }

  showGameResult() {
    const winners = createTemplateResult(this.winners.join());
    $(SELECTORS.RESULT_SECTION).insertAdjacentHTML("beforeend", winners);
    removeHiddenClass($(SELECTORS.RESULT_SECTION));
  }
}
