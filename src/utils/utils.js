import { templateForward } from "../view/template.js";

export const removeHiddenClass = ($selector) => {
  $selector.classList.remove("hidden");
};

export const displayTemplateForward = ($racingCarNames, isMovable) => {
  $racingCarNames.forEach((racingcar) => {
    const result = isMovable();
    console.log(result);
    if (result) {
      racingcar.insertAdjacentHTML("afterend", templateForward);
    }
  });
};

export const removeSpinners = ($spinners) => {
  $spinners.forEach(($el) => {
    $el.style.willChange = "auto";
    $el.style.opacity = 0;
  });
};
