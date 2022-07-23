import { isFunction, isHTMLElement } from "./utils/validator.js";
import { RESET_BUTTON } from "./utils/selector.js";

export class Winners {
  $container;
  $resetButton;
  $header;
  onReset;

  constructor($container, { onReset } = {}) {
    if (!isHTMLElement($container)) {
      throw new TypeError(`${$container} is not a HTMLElement`);
    }
    this.$container = $container;
    this.$header = $container.querySelector("h2");
    this.$resetButton = $container.querySelector(RESET_BUTTON);

    if (!isFunction(onReset)) {
      throw new TypeError(`${onReset} is not a function`);
    }
    this.onReset = onReset;
    this.addEventHandlers();
  }

  getMax(cars) {
    return Math.max(...cars.map((car) => car.position));
  }

  getWinners(cars) {
    const max = this.getMax(cars);
    return cars
      .reduce((result, car) => {
        if (car.position === max) result.push(car);
        return result;
      }, [])
      .map((car) => car.name);
  }

  award(cars) {
    const winners = this.getWinners(cars);
    this.renderWinners(winners);
  }

  getWinnerText(winners) {
    return `🏆 최종 우승자: ${winners.join(", ")} 🏆`;
  }

  renderWinners(winners) {
    this.$header.innerText = this.getWinnerText(winners);
    this.$container.classList.add("visible");
  }

  addEventHandlers() {
    this.$resetButton.addEventListener("click", this.onReset.bind(this));
  }

  reset() {
    this.$header.innerText = "";
    this.$container.classList.remove("visible");
  }
}
