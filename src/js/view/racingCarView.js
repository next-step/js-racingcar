const $racingCarGame = "#racing-car-game";

const setCarReady = (racingCars) => {
  document.querySelector($racingCarGame).innerHTML =
    `<div class="mt-4 d-flex">` +
    racingCars
      .map(
        (car) => `<div class="mr-2" id=${car.name}>
                    <div class="car-player">${car.name}</div>
                   </div>`
      )
      .join("") +
    `</div>`;
};

const moveOrStopCars = (racingCars, responses) => {
  racingCars.forEach((car, idx) => {
    document.querySelector(`#${car.name}`).lastElementChild.remove();

    if (responses[idx] > 0) {
      document
        .querySelector(`#${car.name}`)
        .insertAdjacentHTML(
          "beforeend",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
    }
  });
};

const showWaitingStatus = (racingCars) => {
  racingCars.forEach((car) => {
    document.querySelector(`#${car.name}`).insertAdjacentHTML(
      "beforeend",
      `<div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>`
    );
  });
};

const diableFieldSet = ($selector) => {
  document.querySelector($selector).disabled = true;
};

export { setCarReady, moveOrStopCars, showWaitingStatus, diableFieldSet };
