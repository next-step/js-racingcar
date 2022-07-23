import { SELECTORS } from "./constants.js";

const trialNum = document.querySelector(SELECTORS.TRIAL_NUM_FIELDSET);
const button = document.querySelector("button");
const handleClick = (e) => {
  trialNum.classList.remove("hidden");
};
button.addEventListener("click", handleClick);
