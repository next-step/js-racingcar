import { SELECTORS } from "./constants.js";
import { Subject } from "./subject.js";
import { $ } from "./dom.js";
import { startRacingGame } from "./racing.js";
import { validateNameLength, validateNumRange } from "./validation.js";
import { createTemplateCarPlayer } from "./template.js";
import { removeHiddenClass, displayTemplate } from "./utils.js";

const carNameObserver = new Subject([]);
const trialNumObserver = new Subject(0);

const handleSubmitCarName = (e) => {
  e.preventDefault();

  if (!e.target["car-name__input"].value) {
    return;
  }

  const carNames = e.target["car-name__input"].value.split(",").map((name) => {
    try {
      validateNameLength(name);
    } catch (error) {
      alert(error);
      return;
    }
    return name;
  });

  carNameObserver.notifyAll(carNames);

  $(SELECTORS.TRIAL_NUM_INPUT).focus();
};

const handleSubmitTrialNum = (e) => {
  const trialNum = e.target["trial-num__input"].valueAsNumber;

  e.preventDefault();

  if (!e.target["trial-num__input"].value) {
    return;
  }

  try {
    validateNumRange(trialNum);
  } catch (error) {
    alert(error);
    return;
  }

  trialNumObserver.notifyAll(trialNum);
  removeHiddenClass($(SELECTORS.GAME_SECTION));
};

const observer1 = {
  notify: (carNames) => {
    const templateCarPlayer = createTemplateCarPlayer(carNames);
    displayTemplate($(SELECTORS.CAR_PLAYER_WRAPPER_DIV), templateCarPlayer);
    removeHiddenClass($(SELECTORS.TRIAL_NUM_FIELDSET));
  },
};

const observer2 = {
  notify: (trialNum) => {
    startRacingGame(trialNum);
  },
};

carNameObserver.subscribe(observer1);
trialNumObserver.subscribe(observer2);

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmitCarName);
$(SELECTORS.TRIAL_NUM_FORM).addEventListener("submit", handleSubmitTrialNum);
