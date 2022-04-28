import Car from "../car.js";

export const GameProcess = (carNames, count) => {
  const target = document.querySelector("#game-process-component");
  const _count = count;
  let _cars = [];

  const createCars = (names, count) => {
    names.forEach((name) => {
      _cars.push(new Car(name, count));
    });
  };

  const render = (target) => {
    let carElements = ``;
    _cars.forEach((car) => {
      carElements += `
      <div id="car" class="mr-2">
        <div class="car-player">${car.name}</div>
        <div class="car-path"></div>
      </div>
      `;
    });
    target.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
            ${carElements}
        </div>
      </div>
          `
    );
  };

  const renderCarPath = () => {
    const targets = document.querySelectorAll("#car .car-path");
    targets.forEach((target, index) => {
      if (_cars[index].isGoing) {
        target.insertAdjacentHTML(
          "afterbegin",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
      } else {
        target.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
        `
        );
      }
    });
  };

  const updateCarsStatus = () => {
    let counter = 1;

    const timeout = setInterval(() => {
      renderCarPath();
      if (counter++ == _count) {
        clearInterval(timeout);
      }
    }, 1000);
  };

  /** 컴포넌트 내 즉시 실행되는 함수들 */
  createCars(carNames, _count);
  render(target);
  updateCarsStatus();
};
