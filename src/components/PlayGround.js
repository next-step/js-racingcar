import Component from "../core/Component.js";
import Car from "./Car.js";

export default class PlayGround extends Component {
  template() {
    return /*html*/ `<div class="mt-4 d-flex car-wrapper"></div>`;
  }

  mounted() {
    const $carWrapper = this.$target.querySelector(".car-wrapper");
    const carCount = this.$props.carNames.length;

    const cars = [...new Array(carCount)]
      .map(() => `<div class="mr-2 car-container"></div>`)
      .join("");

    $carWrapper.innerHTML = cars;

    if (cars) {
      const $carContainer = this.$target.querySelectorAll(".car-container");
      this.$props.carNames.map((carName, index) => {
        new Car($carContainer[index], {
          carName,
          processState: this.$props.progress[index],
        });
      });
    }
  }
}
