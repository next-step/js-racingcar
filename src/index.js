import { SELECTORS, ERROR_MESSAGES } from "./constants.js";

const carNameForm = document.querySelector(SELECTORS.CAR_NAME_FORM);
const trialNum = document.querySelector(SELECTORS.TRIAL_NUM_FIELDSET);
const gameSection = document.querySelector(SELECTORS.GAME_SECTION);

const validateNameLength = (name) => {
  if (name.length > 5) {
    throw ERROR_MESSAGES.WORD_LENGTH_ERROR;
  }
};

const validateNumRange = (num) => {
  if (num > 10 || num < 1) {
    throw ERROR_MESSAGES.NUM_RANGE_ERROR;
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
      } catch (error) {
        alert(error);
        return;
      }
      trialNum.classList.remove("hidden");
    });
  }

  //시도 횟수 입력값이 1~10사이가 아니면 경고 메세지를 표시한다.
  if (e.target[4].value) {
    try {
      validateNumRange(e.target[4].value);
    } catch (error) {
      alert(error);
      return;
    }
    gameSection.classList.remove("hidden");
  }
};

carNameForm.addEventListener("submit", handleSubmit);
