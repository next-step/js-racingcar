import { SELECTORS } from "../utils/constants/selectors.js";
import { createTemplateResult } from "../view/template.js";
import {
  displayTemplate,
  removeHiddenClass,
  displayTemplateForward,
  removeSpinners,
} from "../utils/utils.js";
import { $, $$ } from "../utils/dom.js";

export function startRacingGame(trialNum) {
  let count = 1;

  const timeoutId = setInterval(() => {
    // isFoward여부에 따라 레이싱 카들에 전진 템플릿을 삽입한다.
    displayTemplateForward($$(SELECTORS.CAR_DIV_NAME));

    if (count++ === trialNum) {
      clearInterval(timeoutId);
      removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
      resultObserver.notifyAll("test1,test2".split(","));
      setTimeout(() => {
        alert("🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇");
      }, 2000);
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
