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
    $el.style.willChange = "auto"; //willChange => https://wit.nts-corp.com/2017/06/05/4571 / https://dev.opera.com/articles/css-will-change-property/
    $el.style.opacity = 0; //https://wit.nts-corp.com/2020/06/05/6134
  });
};
