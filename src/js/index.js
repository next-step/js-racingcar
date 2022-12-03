import {DOM} from "./constants/dom.js";
import {
  handleCarNamesInput,
  handleLockAttemptInputAndBtn,
} from "./controller.js";

const bindEvents = () => {
  DOM.CAR_NAMES_SUBMIT_BTN.addEventListener("click", handleCarNamesInput);
  DOM.NUMBER_OF_ATTEMPTS_BTN.addEventListener(
    "click",
    handleLockAttemptInputAndBtn
  );
};

bindEvents();
