import { $, addEvent, getRandomInt } from './utils.js';
import { MESSAGE, PROCESS } from './constants.js';

export default class Car {
  constructor(carname) {
    this.name = carname;
    this.distance = 0;
  }

  setPlayer = () => {
    this.track = document.createElement('div');
    this.track.classList.add('mr-2');

    const player = document.createElement('div');
    player.classList.add('car-player');
    player.innerText = this.name;
    this.track.appendChild(player);

    const trace = document.createElement('div');
    trace.classList.add('stop');
    trace.innerHTML = PROCESS.STOP;
    this.track.appendChild(trace);
  };

  getPlayer = () => {
    return this.track;
  };

  move = () => {
    this.distance++;
    const last = this.track.querySelector('.stop');
    const trace = document.createElement('div');
    trace.innerHTML = PROCESS.MOVE;
    last.insertAdjacentElement('beforebegin', trace);
  };

  moveOrNot = () => {
    const random = getRandomInt(0, 9);
    return random >= 4;
  };

  finish = () => {
    const last = this.track.querySelector('.stop');
    last.remove();
  };
}
