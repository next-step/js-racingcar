import { DELIMITER } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { CLICK_EVENT, isButton, reStart } from "../utils/event.js";
import { ATTRIBUTE, COMPONENT, TAG } from "../utils/selector.js";

export default function RacingResult() {
  const $result = $(COMPONENT.RESULT_SECTION);
  $result.setAttribute(TAG.CLASS, ATTRIBUTE.HIDDEN);
  const showResult = () => $result.removeAttribute(TAG.CLASS);

  this.render = winners => {
    showResult();
    const $winner = $(COMPONENT.WINNER, $result);
    $winner.textContent = winners.join(DELIMITER.DISTING);
  }

  const onClickHanlder = event => {
    if(isButton(event)) reStart();
  }

  $result.addEventListener(CLICK_EVENT.CLICK, onClickHanlder);
}
