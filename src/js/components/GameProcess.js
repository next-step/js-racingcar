export default class GameProcess {
  constructor(target, carNames, count) {
    this.#count = count;
    this.#render(target, carNames);
  }

  #count;

  #render = (target, carNames) => {
    let carNameElements = ``;
    carNames.forEach((carName) => {
      carNameElements += `
      <div class="mr-2">
      <div class="car-player">${carName}</div>
      </div>
      `;
    });
    target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="mt-4 d-flex">
            ${carNameElements}
        </div>
      </div>
          `;
  };
}
