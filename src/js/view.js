import {ALERT_MESSAGE} from "./constants/constants.js";
import {DOM} from "./constants/dom.js";
import {$$, showElement} from "./utils/index.js";

export const renderRacingCar = (racingCar, renderSection) => {
  const createRacingLaneTemplate = createRacingCar(racingCar);
  renderSection.appendChild(createRacingLaneTemplate);
  showElement(renderSection);
};

export const createRacingCar = (racingCars) => {
  const fragment = document.createDocumentFragment();

  racingCars.forEach((car) => {
    const carWrapper = document.createElement("div");
    const carElement = document.createElement("div");

    carWrapper.className = "mt-4 d-flex flex-col car";
    carElement.className = `car-player ${car.carName}`;
    carElement.innerText = car.carName;

    carWrapper.appendChild(carElement);
    fragment.appendChild(carWrapper);
  });

  return fragment;
};

export const renderForwardIcon = (carWrapper) => {
  const forwardIcon = document.createElement("div");
  forwardIcon.classList = "forward-icon mt-2";
  forwardIcon.textContent = "⬇️️";

  carWrapper.insertAdjacentElement("afterend", forwardIcon);
};

export const renderLoadingIcon = (carWrapper) => {
  const spinnerFlexContainer = document.createElement("div");
  const spinnerContainer = document.createElement("div");
  const spinnerIcon = document.createElement("div");

  spinnerFlexContainer.className = "d-flex justify-center mt-3 spinner-wrapper";
  spinnerContainer.className = "relative spinner-container";
  spinnerIcon.className = "material spinner";

  spinnerContainer.appendChild(spinnerIcon);
  spinnerFlexContainer.appendChild(spinnerContainer);

  carWrapper.insertAdjacentElement("afterend", spinnerFlexContainer);
};

export const removePrevSpinner = (car) => {
  if (car.lastChild.className.includes("spinner-wrapper")) {
    car.lastChild.remove();
  }
};

export const removeAllSpinnerIcon = () => {
  $$(".car").forEach((car) => {
    removePrevSpinner(car);
  });
};

export const renderGameResult = (winnerList) => {
  showElement(DOM.RACING_WINNER_RENDER_SECTION);

  const winners = winnerList.map((car) => car.carName).join(",");
  DOM.RACING_RENDER_RESULT.innerHTML = winners;
};

export const renderCongratulatoryMessage = () => {
  setTimeout(() => {
    alert(ALERT_MESSAGE.CONGRATULATORY_MESSAGE);
  }, 2000);
};
