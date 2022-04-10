import { RANDOM_NUMBER, CAR_GO_ABLE_NUMBER } from '../constants/common.js';

export default function Car({ $target, $spinner, $forward, initState }) {
  this.$car = null;
  this.$carPlayer = null;
  this.state = initState;

  this.go = () => {
    this.$carPlayer.after($forward.cloneNode(true));
    this.state.goCount++;
  };

  this.finish = () => {
    this.$car.removeChild(this.$car.lastChild);
  };

  this.initCar = () => {
    this.$car = document.createElement('div');
    this.$car.className = 'car mr-2';
    this.$car.dataset.cy = 'car';
    this.$carPlayer = document.createElement('div');
    this.$carPlayer.className = 'car-player';
    this.$carPlayer.textContent = this.state.carName;
    this.$car.appendChild(this.$carPlayer);
    this.$car.appendChild($spinner.cloneNode(true));
    $target.appendChild(this.$car);
  };

  this.initCar();
}

Car.getRandomNumber = () => Math.floor(Math.random() * RANDOM_NUMBER.MAX) + RANDOM_NUMBER.MIN;

Car.checkAbleGo = (randomNumber) => randomNumber >= CAR_GO_ABLE_NUMBER;
