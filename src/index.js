import { SELECTORS } from "./constants.js";

const trialNum = document.querySelector(SELECTORS.TRIAL_NUM_FIELDSET);
const button = document.querySelector("button");
const handleClick = (e) => {
  console.log("clicked");
  trialNum.classList.remove("hidden");
};
button.addEventListener("click", handleClick);
