import {DOM} from "./constants/dom.js";
import {handleSubmitCarNames, handleSubmitAttempts} from "./controller.js";

const bindEvents = () => {
  DOM.CAR_NAMES_SUBMIT_BTN.addEventListener("click", handleSubmitCarNames);
  DOM.NUMBER_OF_ATTEMPTS_BTN.addEventListener("click", handleSubmitAttempts);
};

bindEvents();
