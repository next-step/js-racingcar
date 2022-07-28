import { templateForward } from "./template.js";

export const removeHiddenClass = ($selector) => {
  $selector.classList.remove("hidden");
};

export const displayTemplate = ($selector, template) => {
  $selector.innerHTML = template;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

export const isFoward = () => {
  const randomNum = getRandomInt(1, 10);
  return randomNum > 4;
};

export const displayTemplateForward = ($racingCarNames) => {
  $racingCarNames.forEach((racingcar) => {
    if (isFoward()) {
      racingcar.insertAdjacentHTML("afterend", templateForward);
    }
  });
};

export const removeSpinners = ($spinners) => {
  $spinners.forEach(($el) => {
    $el.style.willChange = "auto";
    $el.style.display = "none";
  });
};
