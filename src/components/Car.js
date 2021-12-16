import Component from "../core/Component.js";

export default class Car extends Component {
  template() {
    return /*html*/ `<div class="car-player"></div>
      <div class="forward-icon mt-2"></div>
    `;
  }

  mounted() {
    const $carPlayer = this.$target.querySelector(".car-player");
    const $forwardIcon = this.$target.querySelector(".forward-icon");
    $carPlayer.textContent = this.$props.carName;
    $forwardIcon.textContent = this.$props.processState.reduce(
      (prev, curr) => prev + curr
    );
  }
}
