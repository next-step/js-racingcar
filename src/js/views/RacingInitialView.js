import { SELECTOR } from "../constant/index.js";

const RacingInitialView = {
  makeInitTemplate(carName) {
    return `<div class="mr-2" id="car-${carName}">
    <div class="car-player">${carName}</div>
    <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
  </div>`;
  },
  render({ carsInfo }) {
    const $target = document.querySelector(SELECTOR.CAR_CONTAINER);
    /*html*/
    const $template = carsInfo.reduce((acc, cur) => {
      return acc + this.makeInitTemplate(cur.name);
    }, "");

    $target.insertAdjacentHTML("beforeend", $template);
  },
};

export default RacingInitialView;
