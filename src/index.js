import { SELECTORS, ERROR_MESSAGES } from "./constants.js";

const carNameForm = document.querySelector(SELECTORS.CAR_NAME_FORM);
const trialNum = document.querySelector(SELECTORS.TRIAL_NUM_FIELDSET);
const gameSection = document.querySelector(SELECTORS.GAME_SECTION);

const validateNameLength = (name) => {
  if (name.length > 5) {
    throw ERROR_MESSAGES.WORD_LENGTH_ERROR;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e);
  console.log(e.target[1].value);

  // 각 자동차 이름이 5글자가 넘으면 경고 메세지를 표시한다.
  if (e.target[1].value) {
    e.target[1].value.split(",").map((name) => {
      try {
        validateNameLength(name);
        trialNum.classList.remove("hidden");
        gameSection.classList.remove("hidden");
      } catch (error) {
        alert(error);
      }
    });
  }
};

carNameForm.addEventListener("submit", handleSubmit);
