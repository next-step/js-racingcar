import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE} from "../js/constants/constants.js";
import {isValidation} from "../js/model.js";

export const handleCarNamesInput = (event) => {
  event.preventDefault();

  if (isValidation(DOM.CAR_NAMES_ID_INPUT.value)) {
    DOM.CAR_NAMES_ID_INPUT.disabled = true;
    DOM.CAR_NAMES_SUBMIT_BTN.disabled = true;

    handleNumberOfAttempts();
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    DOM.CAR_NAMES_ID_INPUT.value = "";
  }
};

export const handleNumberOfAttempts = () => {
  DOM.NUMBER_OF_ATTEMPTS_FIELDSET.classList.remove("d-none");
};

export const handleCarViewAndRace = (event) => {
  event.preventDefault();
  console.log("check");
};
