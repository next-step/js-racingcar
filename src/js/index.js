import {DOM} from "./constants/dom.js";
import {
  handleSubmitCarNames,
  handleSubmitAttempts,
  handleSubmitResetBtn,
} from "./controller.js";

const bindEvents = () => {
  DOM.CAR_NAMES_SUBMIT_BTN.addEventListener("click", handleSubmitCarNames);
  DOM.NUMBER_OF_ATTEMPTS_BTN.addEventListener("click", handleSubmitAttempts);
  DOM.RACING_GAME_RESET.addEventListener("click", handleSubmitResetBtn);
};

bindEvents();
