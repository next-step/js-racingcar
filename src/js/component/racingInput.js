import { $ } from "../utils/dom.js";
import { CAR_ATTRIBUTE, COMPONENT, TAG } from "../utils/selector.js";
import { getId, getValue, isEnter, KEY_EVENT } from "../utils/event.js";
import { ERROR_CHECK } from "../utils/error.js";

export default function RacingInput(app) {
  const $input = $(COMPONENT.INPUT);
  const $tryNumInput = $(COMPONENT.TRY_SECTION);
  // $tryNumInput.setAttribute(TAG.CLASS, CAR_ATTRIBUTE.HIDDEN);
  // const showTry = () => $tryNumInput.removeAttribute(TAG.CLASS);

  const onKeyHandler = event => {
    if(!isEnter(event)) return;
    const inputTarget = getId(event);
    if(inputTarget === COMPONENT.CAR_INPUT) {
      const names = getValue(event).split(",").map(name => {
        return ERROR_CHECK.NAME_LENGTH(name) ?? false;
      })
      if(!names.includes(false)) {
        app.inputCar(names);
        // showTry(); TODO: tryinput 보이게, 본인은 disable하게 
      }
      return;
    }
    if(inputTarget === COMPONENT.TRY_INPUT) {
      const tryNum = ERROR_CHECK.TRY_SIZE(getValue(event));
      if(tryNum) {
        app.inputTry(tryNum);
      }
    }
  }

  $input.addEventListener(KEY_EVENT.KEY_DOWN, onKeyHandler);
}