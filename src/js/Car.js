import { isHTMLElement } from "./utils/validator.js";
import { MAX_POSSIBILITY, MOVE_THRESHOLD, THOUSAND_MILLISECOND } from "./utils/constant.js";

export class Car {
  $app;
  $container;
  $carEl;
  name;
  position = 0;

  constructor($container, name) {
    if (!isHTMLElement($container)) {
      throw new TypeError(`${container} is not a HTMLElement`);
    }
    this.$container = $container;
    this.name = name;
  }

  createCarEl() {
    const el = document.createElement("div");
    el.classList.add("mr-2");
    el.innerHTML = `<div class="car-player">${this.name}</div>`;
    return el;
  }

  setCarEl() {
    this.$carEl = this.createCarEl();
  }

  setup() {
    this.setCarEl();
    return this.$carEl;
  }

  isMovable() {
    return Math.random() * MAX_POSSIBILITY >= MOVE_THRESHOLD;
  }

  createRaceStateElement() {
    const stateElement = document.createElement("div");
    stateElement.classList.add("car-state-element", "mt-2");

    stateElement.innerHTML = `
      <div class="spinner-container">
        <span class="spinner material"></span>
      </div>
    `;

    return stateElement;
  }

  loading() {
    const raceStateElement = this.createRaceStateElement();
    this.$carEl.append(raceStateElement);
    return raceStateElement;
  }

  move() {
    return new Promise((resolve) => {
      const raceStateElement = this.loading();
      setTimeout(() => {
        const isMovable = this.isMovable();
        if (isMovable) this.moveForward(raceStateElement);
        this.finish(isMovable, raceStateElement);
        resolve();
      }, THOUSAND_MILLISECOND);
    });
  }

  finish(isMovable, raceStateElement) {
    if (isMovable) return;
    raceStateElement.remove();
  }

  getForwardIcon(raceStateElement) {
    raceStateElement.classList.add("forward-icon");
    raceStateElement.textContent = "⬇️️";
    return raceStateElement;
  }

  moveForward(raceStateElement) {
    this.getForwardIcon(raceStateElement);
    this.position += 1;
  }
}
