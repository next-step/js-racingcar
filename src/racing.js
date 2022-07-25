import { SELECTORS } from "./constants.js";
import { templateForward } from "./template.js";

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

const isFoward = () => {
  return getRandomInt(1, 10) > 4;
};

export function startRacingGame(times) {
  let count = 1;
  const racingCars = document.querySelectorAll(SELECTORS.CAR_PLAYER_DIV);

  const timeoutId = setInterval(() => {
    // isFoward여부에 따라 레이싱 카들에 전진 템플릿을 삽입한다.

    racingCars.forEach((racingcar) => {
      if (isFoward()) {
        racingcar.insertAdjacentHTML("afterend", templateForward);
      }
    });

    if (count++ === times) {
      clearInterval(timeoutId);
      // 스피너를 제거하는 로직
    }
  }, 1000);
}
