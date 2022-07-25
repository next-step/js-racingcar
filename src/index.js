import { SELECTORS } from "./constants.js";
import { $ } from "./dom.js";
import { startRacingGame } from "./racing.js";
import { validateNameLength, validateNumRange } from "./validation.js";
import { createTemplateCarPlayer } from "./template.js";
import { displaySelector } from "./utils.js";

const handleSubmitCarName = (e) => {
  e.preventDefault();

  // 각 자동차 이름이 5글자가 넘으면 경고 메세지를 표시한다.
  if (e.target[1].value) {
    e.target[1].value.split(",").map((name) => {
      try {
        validateNameLength(name);
      } catch (error) {
        alert(error);
        return;
      }
      createTemplateCarPlayer($(SELECTORS.CAR_NAME_INPUT));
      displaySelector($(SELECTORS.TRIAL_NUM_FIELDSET));
      $(SELECTORS.TRIAL_NUM_INPUT).focus();
    });
  }
};

const handleSubmitTrialNum = (e) => {
  e.preventDefault();

  //시도 횟수 입력값이 1~10사이가 아니면 경고 메세지를 표시한다.
  if (e.target[1].value) {
    try {
      validateNumRange(e.target[1].valueAsNumber);
      startRacingGame(e.target[1].valueAsNumber);
    } catch (error) {
      alert(error);
      return;
    }
    displaySelector($(SELECTORS.GAME_SECTION));
  }
};

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmitCarName);
$(SELECTORS.TRIAL_NUM_FORM).addEventListener("submit", handleSubmitTrialNum);
