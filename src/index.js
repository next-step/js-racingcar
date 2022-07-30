
import { SELECTORS } from "./utils/constants/selectors.js";
import { RacingModel } from "./model/racingModel.js";
import { $ } from "./utils/dom.js";
import { removeHiddenClass } from "./utils/utils.js";

export const model = new RacingModel();



const handleSubmitCarName = (e) => {
  e.preventDefault();

  const carNames = e.target["car-name__input"].value;

  if (!carNames) {
    return;
  }
  model.setCarNames(carNames);
  model.displayCars();
  removeHiddenClass($(SELECTORS.COUNT_SECTION));
  $(SELECTORS.COUNT_INPUT).focus();
};

const handleSubmitCount = (e) => {
  const $count = e.target["count__input"].value;

  e.preventDefault();

  if (!$count) {
    return;
  }

  model.setCount(Number($count));
  removeHiddenClass($(SELECTORS.GAME_SECTION));
  model.startRacingGame(Number($count));
};

$(SELECTORS.CAR_NAME_FORM).addEventListener("submit", handleSubmitCarName);
$(SELECTORS.COUNT_FORM).addEventListener("submit", handleSubmitCount);

 
