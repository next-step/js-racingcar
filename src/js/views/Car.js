import { SELECTOR, ERROR_MESSAGE } from "../constant/index.js";
class Car {
  #carsInfo;
  constructor(carsInfo) {
    this.$target = document.querySelector(SELECTOR.CAR_CONTAINER);
    this.#carsInfo = carsInfo;
  }
  move() {
    //distance가 0보다 클때까지 이동
    //1초마다 1칸씩 이동 -> distance--;
    //이동할 때마다 render
  }

  renderMovement() {
    /*html*/
    const $template = `<div class="forward-icon mt-2">⬇️️</div>`;
    //<div class="mr-2">끝에 붙인다.
    const $target = document.querySelector("#car-section");
    $target.insertAdjacentHTML("beforeend", $template);
  }

  renderSpinner() {
    /*html*/
    const $spinner = ` <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>`;
    //<div class="mr-2">끝에 붙인다.
    const $target = document.querySelector("#car-section");
    $target.insertAdjacentHTML("beforeend", $template);
  }
  makeInitTemplate(carName) {
    return `<div class="mr-2" id="car-section">
    <div class="car-player">${carName}</div>
    <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
  </div>`;
  }

  render() {
    //초기 렌더링을 담당한다.
    //   <section class="d-flex justify-center mt-5"><div class="mt-4 d-flex">에 붙이는 로직

    /*html*/
    const $template = this.#carsInfo.reduce((acc, cur) => {
      return acc + this.makeInitTemplate(cur.name);
    }, "");

    this.$target.insertAdjacentHTML("beforeend", $template);
    this.renderMovement();
    this.renderMovement();
  }
}

export default Car;
