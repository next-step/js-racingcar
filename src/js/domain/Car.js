import { generateRandom } from "../utils/utils.js";

const loadingSpinner = `
  <div class="loading-spinner d-flex justify-center mt-4">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
`;

const forwardIcon = `<div class="forward-icon mt-2">⬇️</div>`;

const template = (name) => `
  <div class="mr-2">
    <div class="car-player">${name}</div>
  </div>
`;

export default class Car {
  constructor(name) {
    this.name = name;
    this.isLoading = false;
    this.position = 0;
    this.createCarTemplate();
  }

  createCarTemplate() {
    const div = document.createElement("div");
    div.innerHTML = template(this.name).trim();
    this.dom = div.firstChild;
  }

  render() {
    this.resetDom();
    this.renderPosition();
    if (this.isLoading) {
      this.renderLoadingSpinner();
    }

    return this.dom;
  }

  resetDom() {
    this.dom.innerHTML = `<div class="car-player">${this.name}</div>`;
  }

  renderPosition() {
    for (let i = 0; i < this.position; i++) {
      this.dom.insertAdjacentHTML("beforeend", forwardIcon);
    }
  }

  renderLoadingSpinner() {
    this.dom.insertAdjacentHTML("beforeend", loadingSpinner);
  }

  setLoading(value) {
    this.isLoading = value;
  }

  race() {
    if (generateRandom(0, 9) < 4) {
      return;
    }
    this.move();
  }

  move() {
    this.position++;
  }
}
