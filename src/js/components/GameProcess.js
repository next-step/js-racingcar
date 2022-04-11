import Car from "../car.js";

export default class GameProcess {
  constructor(target, carNames, count) {
    this.#count = count;
    this.#createCars(carNames, count);
    this.#render(target);
    this.#updateCarsStatus();
  }

  #count;
  #cars = [];

  #createCars = (names, count) => {
    names.forEach((name) => {
      this.#cars.push(new Car(name, count));
    });
  };

  #render = (target) => {
    let carElements = ``;
    this.#cars.forEach((car) => {
      carElements += `
      <div id="car" class="mr-2">
        <div class="car-player">${car.name}</div>
        <div class="car-path"></div>
      </div>
      `;
    });
    target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
            ${carElements}
        </div>
      </div>
          `;
  };

  #renderCarPath = () => {
    const targets = document.querySelectorAll("#car .car-path");
    targets.forEach((target, index) => {
      if (this.#cars[index].isGoing) {
        target.innerHTML += `<div class="forward-icon mt-2">⬇️️</div>`;
      } else {
        target.innerHTML += `
        <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
        `;
      }
    });
  };

  #updateCarsStatus = () => {
    let counter = 1;

    const timeout = setInterval(() => {
      this.#renderCarPath();
      if (counter++ == this.#count) {
        clearInterval(timeout);
      }
    }, 1000);
  };
}
