import {
  $carPlayerContainer,
  $racingCarSection,
  $tryInputNumber,
} from "../../constant/constant.js";
import { CAR_RACING_INTERVAL } from "../../constant/validation.js";
import { confirmCarName } from "./confirmCarName.js";
import { playRacing } from "./playRacing.js";

const playRacingInterval = () => {
  const racingInterval = setInterval(() => {
    playRacing();
  }, CAR_RACING_INTERVAL);

  setTimeout(() => {
    clearInterval(racingInterval);
    const removeSpinnerArray = document.querySelectorAll(".spinner-wrapper");
    removeSpinnerArray.forEach((spinner) => {
      spinner.remove();
    });
  }, $tryInputNumber.value * CAR_RACING_INTERVAL);
};

export const confirmTryNumber = () => {
  const carNameArray = confirmCarName();
  carNameArray.forEach((carName) => {
    const carPlayerWrapper = document.createElement("div");
    carPlayerWrapper.className = "mr-2";

    const carPlayer = document.createElement("div");
    carPlayer.className = `${carName} car-player`;
    carPlayer.textContent = carName;

    const spinnerWrapper = document.createElement("div");
    spinnerWrapper.className = `${carName}-spinner spinner-wrapper d-flex justify-center mt-3`;

    const spinnerContainer = document.createElement("div");
    spinnerContainer.className = "relative spinner-container";

    const spinnerIcon = document.createElement("span");
    spinnerIcon.className = "material spinner";

    carPlayerWrapper.append(carPlayer);
    $carPlayerContainer.append(carPlayerWrapper);
    carPlayerWrapper.insertAdjacentElement("beforeend", spinnerWrapper);
    spinnerWrapper.append(spinnerContainer);
    spinnerContainer.append(spinnerIcon);
  });

  $racingCarSection.style.display = "flex";
  $tryInputNumber.disabled = true;
  playRacingInterval();
};
