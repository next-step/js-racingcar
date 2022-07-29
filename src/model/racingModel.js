import { SELECTORS } from "../utils/constants/selectors.js";
import { validateNumRange, validateNameLength } from "./validation.js";
import { $, $$ } from "../utils/dom.js";
import {
  displayTemplateForward,
  removeHiddenClass,
  removeSpinners,
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

  //객체 내에서만 호출되는 함수들은 #(프라이빗)처리해준다.
  // 밖에서는 내부로직 알 필요 없으므로 숨긴다 = "추상화"?? 뷰티파이?를 까보시는구나...커스터마이징...
  #getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  #isAbleToMoveFoward = () => {
    debugger;
    const randomNum = this.#getRandomInt(1, 10);
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
    //그냥 0,Array.fill()
    //Array($carNames.length).fill(0)
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
      // this.arrows[idx] += 1; //만화로 보는 http
      if (cnt++ === $count) {
        clearInterval(timeoutId);
        this.getRacingResult();
        removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
        this.showGameResult();
        setTimeout(() => {
          alert("🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇");
        }, 2000); // 프로미스/비동기 => async/await => setTimeout() 를 구현(연습)
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
