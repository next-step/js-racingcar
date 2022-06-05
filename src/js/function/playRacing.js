import {
  CAR_RACING_RANDOM_CONDITION,
  CAR_RACING_RANDOM_NUMBER,
} from "../../constant/validation.js";
import { confirmCarName } from "./confirmCarName.js";

export const playRacing = () => {
  const carNameArray = confirmCarName();
  carNameArray.forEach((carName) => {
    const spinnerWrapper = document.querySelector(`.${carName}-spinner`);
    let RandomNumber = Math.floor(Math.random() * CAR_RACING_RANDOM_NUMBER);

    let goIcon = document.createElement("div");

    goIcon.className = "forward-icon mt-2";
    goIcon.textContent = "⬇️️";
    if (RandomNumber >= CAR_RACING_RANDOM_CONDITION) {
      spinnerWrapper.insertAdjacentElement("beforebegin", goIcon);
    }
  });
};
