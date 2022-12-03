import {DOM} from "./constants/dom.js";
import {handleCarNamesInput, handleCarViewAndRace} from "./controller.js";

const bindEvents = () => {
  DOM.CAR_NAMES_SUBMIT_BTN.addEventListener("click", handleCarNamesInput);
  DOM.NUMBER_OF_ATTEMPTS_BTN.addEventListener("click", handleCarViewAndRace);
};

bindEvents();
