import { RANDOM_NUMBER, CAR_GO_ABLE_NUMBER } from '../constants/common.js';

export default class Car {
  constructor({ $target, $template, initState }) {
    this.$target = $target;
    this.$template = $template;
    this.state = initState;
    this.init();
  }

  init() {
    this.$car = document.createElement('div');
    this.$car.className = 'car mr-2';
    this.$car.dataset.cy = 'car';
    this.$carPlayer = document.createElement('div');
    this.$carPlayer.className = 'car-player';
    this.$carPlayer.textContent = this.state.carName;
    this.$car.appendChild(this.$carPlayer);
    this.$car.appendChild(this.$template.getElement('spinner').cloneNode(true));
    this.$target.appendChild(this.$car);
  }

  go() {
    this.$carPlayer.after(this.$template.getElement('forward').cloneNode(true));
    this.state.goCount++;
  }

  finish() {
    this.$car.removeChild(this.$car.lastChild);
  }

  static getRandomNumber() {
    return Math.floor(Math.random() * RANDOM_NUMBER.MAX) + RANDOM_NUMBER.MIN;
  }

  static checkAbleGo(randomNumber) {
    return randomNumber >= CAR_GO_ABLE_NUMBER;
  }
}
