import { SELECTORS } from "../utils/constants/selectors.js";
import { validateNumRange, validateNameLength } from "./validation.js";
import { $, $$ } from "../utils/dom.js";
import {
  displayTemplateForward,
  removeHiddenClass,
  removeSpinners,
  getRandomInt,
} from "../utils/utils.js";
import {
  createTemplateCarPlayer,
  createTemplateResult,
} from "../view/template.js";

export class RacingModel {
  constructor() {
    this.carNames = [];
    this.count = 0;
    this.arrows = [];
    this.winners = [];
  }

  #isAbleToMoveFoward = () => {
    const randomNum = getRandomInt(1, 10);
    return randomNum > 4;
  };

  setCarNames($carNames) {
    this.carNames = [];

    $carNames.split(",").forEach(($name) => {
      try {
        validateNameLength($name);
      } catch (error) {
        alert(error.message);
        return;
      }
      this.carNames.push($name);
    });

    this.arrows = Array.from({ length: $carNames.length }, () => 0);

    console.log(this.carNames);
  }

  setCount($count) {
    try {
      validateNumRange($count);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.count = $count;
    console.log(this.count);
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
      displayTemplateForward(
        $$(SELECTORS.CAR_DIV_NAME),
        this.#isAbleToMoveFoward
      );

      if (cnt++ === $count) {
        clearInterval(timeoutId);
        this.getRacingResult();
        removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
        this.showGameResult();
        setTimeout(() => {
          alert("🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇");
        }, 2000);
      }
    }, 1000);
  }

  getRacingResult() {
    const max = Math.max(...this.arrows);
    this.winners = this.carNames.filter(
      (name, idx) => this.arrows[idx] === max
    );
  }

  showGameResult() {
    const winners = createTemplateResult(this.winners.join());
    $(SELECTORS.RESULT_SECTION).insertAdjacentHTML("beforeend", winners);
    removeHiddenClass($(SELECTORS.RESULT_SECTION));
  }
}
