import { SELECTORS, ERROR_MESSAGES } from "./constants.js";
import { $ } from "./dom.js";

const validateNameLength = ($name) => {
  if ($name.length > 5) {
    throw ERROR_MESSAGES.WORD_LENGTH_ERROR;
  }
};

const validateNumRange = ($num) => {
  if ($num > 10 || $num < 1) {
    throw ERROR_MESSAGES.NUM_RANGE_ERROR;
  }
};

const displaySelector = ($selector) => {
  $selector.classList.remove("hidden");
};

const createCarPlayerDiv = ($name) => {
  const templateName = `<div class="car-player">${$name}</div>`;
  //   const templateSpinner = `<div class="spinners d-flex justify-center mt-3">
  //   <div class="relative spinner-container">
  //     <span class="material spinner"></span>
  //   </div>
  // </div>`;
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
        createCarPlayerDiv(name);
      } catch (error) {
        alert(error);
        return;
      }
      displaySelector($(SELECTORS.TRIAL_NUM_FIELDSET));
      $(SELECTORS.TRIAL_NUM_INPUT).focus();
    });
  }

  //시도 횟수 입력값이 1~10사이가 아니면 경고 메세지를 표시한다.
  if (e.target[4].value) {
    try {
      validateNumRange(e.target[4].valueAsNumber);
    } catch (error) {
      alert(error);
      return;
    }
    displaySelector($(SELECTORS.GAME_SECTION));
  }
};

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmit);
