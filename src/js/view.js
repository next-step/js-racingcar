import { $ } from "./utils.js";

export const dom = {
  carsNameButton: $(".", "cars-name-btn"),
  raceForm: $(".", "race-form"),
  tryCount: $(".", "try-count"),
  tryCountButton: $(".", "try-count-btn"),
  raceResultWrapper: $(".", "race-result-wrapper"),
  raceResult: $(".", "race-result"),
  raceStatus: $(".", "race-status"),
  raceResultChild: $(".", "race-status-child"),
  resetButton: $(".", "reset"),
};

export const showElement = (state) => {
  switch (state) {
    case "inputCarsName":
      dom.tryCount.classList.remove("hide");
      break;
    case "inputTryCount":
      dom.raceStatus.classList.remove("hide");
      break;
  }
};

export const renderArrowElement = (car) => {
  car.raceCarElement.querySelector(".d-flex").outerHTML = `
    <div class="forward-icon mt-2">⬇️️</div>
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `;
};

export const renderRemoveProcess = (car) => {
  car.raceCarElement.querySelector(".d-flex").remove();
};

export const renderWinner = (cars) => {
  const winnerProgressLength = Math.max(
    ...cars.map((car) => car.progressLength)
  );
  const winnerCar = cars.filter(
    (car) => car.progressLength === winnerProgressLength
  );

  const winners = winnerCar.map((car) => car.name);

  dom.raceResultWrapper.classList.remove("hide");
  dom.raceResult.innerHTML = `
    🏆 최종 우승자: ${winners} 🏆
  `;
};

export const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
