import { SELECTORS } from "./constants.js";
import { Subject } from "./subject.js";
import { createTemplateResult, templateForward } from "./template.js";
import { displayTemplate, removeHiddenClass } from "./utils.js";
import { $ } from "./dom.js";

const resultObserver = new Subject([]);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

const isFoward = () => {
  const randomNum = getRandomInt(1, 10);
  return randomNum > 4;
};

export function startRacingGame(trialNum) {
  let count = 1;

  const $spinners = document.querySelectorAll(".spinners");
  const $racingCarNames = document.querySelectorAll(SELECTORS.CAR_DIV_NAME);

  const timeoutId = setInterval(() => {
    // isFoward여부에 따라 레이싱 카들에 전진 템플릿을 삽입한다.

    $racingCarNames.forEach((racingcar) => {
      if (isFoward()) {
        racingcar.insertAdjacentHTML("afterend", templateForward);
      }
    });

    if (count++ === trialNum) {
      clearInterval(timeoutId);

      $spinners.forEach(($el) => {
        $el.style.willChange = "auto";
        $el.style.opacity = "0";
      });

      resultObserver.notifyAll("test1,test2".split(","));
    }
  }, 1000);
}

const showGameResult = {
  notify: (winners) => {
    const template = createTemplateResult(winners);
    displayTemplate($(SELECTORS.RESULT_SECTION), template);
    removeHiddenClass($(SELECTORS.RESULT_SECTION));
  },
};

resultObserver.subscribe(showGameResult);
