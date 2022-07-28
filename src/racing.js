import { SELECTORS } from "./constants.js";
import { Subject } from "./subject.js";
import { createTemplateResult } from "./template.js";
import {
  displayTemplate,
  removeHiddenClass,
  displayTemplateForward,
  removeSpinners,
} from "./utils.js";
import { $, $$ } from "./dom.js";

const resultObserver = new Subject([]);

export function startRacingGame(trialNum) {
  let count = 1;

  const timeoutId = setInterval(() => {
    // isFoward여부에 따라 레이싱 카들에 전진 템플릿을 삽입한다.

    displayTemplateForward($$(SELECTORS.CAR_DIV_NAME));

    if (count++ === trialNum) {
      clearInterval(timeoutId);
      removeSpinners($$(SELECTORS.CAR_DIV_SPINNER));
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
