import {CAR} from "./constants/constants.js";
import {$$, showElement, getRandomNumber} from "./utils/index.js";

export const handleCarViewAndRace = (carNamesArr, renderSection) => {
  const createdRacingCar = createRacingCar(carNamesArr);
  renderSection.appendChild(createdRacingCar);
  showElement(renderSection);
};

export const createRacingCar = (racingCars) => {
  const fragment = document.createDocumentFragment();

  racingCars.forEach((car) => {
    const carWrapper = document.createElement("div");
    const carElement = document.createElement("div");

    carWrapper.className = "mt-4 d-flex flex-col car";
    carElement.className = "car-player";
    carElement.innerText = car.name;

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

export const startRacingCar = (racingCars) => {
  $$(".car").forEach((car, idx) => {
    removePrevSpinner(car);

    if (CAR.GO_OR_STOP_STANDARD < getRandomNumber(0, 9)) {
      racingCars[idx].forward();
      renderForwardIcon(car.lastChild);
    } else {
      renderLoadingIcon(car.lastChild);
    }
  });
};

export const removePrevSpinner = (car) => {
  if (car.lastChild.className.includes("spinner-wrapper")) {
    car.lastChild.remove();
  }
};
