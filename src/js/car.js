import { $, addEvent, getRandomInt } from './utils.js';
import { MESSAGE, PROCESS } from './constants.js';

export default class Car {
  constructor(carname) {
    this.name = carname;
    this.distance = 0;
    this.state = null;
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

  // 1초 마다 갈지 안갈지.
  // 가게 되면 move icon으로 변경
  // 가지 않으면 계속 스피너
  // 마지막 스피너 앞에 무브 아이콘으로 변경
  move = () => {
    this.distance++;
    const last = this.track.querySelector('.stop');
    const trace = document.createElement('div');
    trace.innerHTML = PROCESS.MOVE;
    last.insertAdjacentElement('beforeend', trace);
  };

  moveOrNot = () => {
    const random = getRandomInt(0, 9);
    return random >= 4;
  };
}
