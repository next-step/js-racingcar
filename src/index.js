import { SELECTORS } from "./constants.js";
import { $ } from "./dom.js";
import { startRacingGame } from "./racing.js";
import { validateNameLength, validateNumRange } from "./validation.js";
import { createTemplateCarPlayer } from "./template.js";
import { removeHiddenClass, displayTemplate } from "./utils.js";

const handleSubmitCarName = (e) => {
  const templateCarPlayer = createTemplateCarPlayer(
    $(SELECTORS.CAR_NAME_INPUT)
  );
  e.preventDefault();

  if (!e.target[1].value) {
    return;
  }

  e.target[1].value.split(",").map((name) => {
    try {
      validateNameLength(name);
    } catch (error) {
      alert(error);
      return;
    }
    displayTemplate($(SELECTORS.CAR_PLAYER_WRAPPER_DIV), templateCarPlayer);
    removeHiddenClass($(SELECTORS.TRIAL_NUM_FIELDSET));
    $(SELECTORS.TRIAL_NUM_INPUT).focus();
  });
};

const handleSubmitTrialNum = (e) => {
  e.preventDefault();

  if (!e.target[1].value) {
    return;
  }

  try {
    validateNumRange(e.target[1].valueAsNumber);
    startRacingGame(e.target[1].valueAsNumber);
  } catch (error) {
    alert(error);
    return;
  }
  removeHiddenClass($(SELECTORS.GAME_SECTION));
};

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmitCarName);
$(SELECTORS.TRIAL_NUM_FORM).addEventListener("submit", handleSubmitTrialNum);
