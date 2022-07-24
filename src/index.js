import { SELECTORS, ERROR_MESSAGES } from "./constants.js";
import { $ } from "./dom.js";
import { startRacingGame } from "./racing.js";

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

const createCarPlayerDiv = ($input) => {
  const template = $input.value.split(",").map(
    (name) => `<div class="car">
                  <div class="car-player">${name}</div>
                  <div class="spinners d-flex justify-center mt-3">
                    <div class="relative spinner-container">
                      <span class="material spinner"></span>
                    </div>
                  </div>
                </div>`
  );

  $(SELECTORS.CAR_PLAYER_WRAPPER_DIV).innerHTML = template;
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
      createCarPlayerDiv($(SELECTORS.CAR_NAME_INPUT));
      displaySelector($(SELECTORS.TRIAL_NUM_FIELDSET));
      $(SELECTORS.TRIAL_NUM_INPUT).focus();
    });
  }

  //시도 횟수 입력값이 1~10사이가 아니면 경고 메세지를 표시한다.
  if (e.target[4].value) {
    try {
      validateNumRange(e.target[4].valueAsNumber);
      startRacingGame(e.target[4].valueAsNumber);
    } catch (error) {
      alert(error);
      return;
    }
    displaySelector($(SELECTORS.GAME_SECTION));
  }
};

// sumbmit을 자동차 이름과 실행 횟수를 따로 관리할 수 있도록
// => html: form 2개로 나누기!

// 화살표 템플릿과 스피너 템플릿을 만든다.
// 전진 조건에 따라
// setInterval

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmit);
