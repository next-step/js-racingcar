import { SELECTOR, ERROR_MESSAGE } from "../constant/index.js";
class CarView {
  $car;
  constructor({ name }) {
    this.$car = document.querySelector(`#car-${name}`);
  }
  renderArrow() {
    //TODO: 그 자리에 있던 로딩을 없애고 넣는다.
    this.renderSpinner();
    this.$car.lastElementChild.remove();

    /*html*/
    const $template = `<div class="forward-icon mt-2">⬇️️</div>`;
    this.$car.insertAdjacentHTML("beforeend", $template);
  }

  renderSpinner() {
    /*html*/
    const $spinner = `<div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>`;
    this.$car.insertAdjacentHTML("beforeend", $spinner);
  }
}

export default CarView;
