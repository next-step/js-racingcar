class CarView {
  $car;
  name;
  constructor({ name }) {
    this.$car = document.querySelector(`#car-${name}`);
    this.name = name;
  }

  renderArrow() {
    this.$car.lastElementChild.remove();

    /*html*/
    const $template = `<div class="forward-icon mt-2">⬇️️</div>`;
    this.$car.insertAdjacentHTML("beforeend", $template);

    this.renderSpinner();
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

  hideSpinner() {
    this.$car = document.querySelector(`#car-${this.name}`);
    this.$car.lastElementChild.remove();
  }
}

export default CarView;
