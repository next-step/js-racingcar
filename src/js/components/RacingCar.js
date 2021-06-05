import { $ } from '../utils/helpers.js';
import getRandomInt from '../utils/getRandomInt.js';

const track = (name, id) => {
  return `
        <div class="mr-2" data-car=${id}>
          <div class="car-player">${name}</div>
        </div>
        `;
};

const go = () => `<div class="forward-icon mt-2">⬇️️</div>`;

const spinner = () => {
  return `
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
  `;
};

export default function RacingCar(name, id) {
  this.distance = 0;
  this.myTrack;
  this.name = name;
  this.id = id;

  this.ready = (track) => {
    this.myTrack = track;
    this.$stop = document.createElement('div');
    this.$stop.className = 'd-flex justify-center mt-3 spinner-box';
    this.$stop.insertAdjacentHTML('beforeend', spinner());
    this.myTrack.insertAdjacentElement('beforeend', this.$stop);
  };

  // TODO: 디폴트 인자를 넣어서 만약 값이 있다면 그 값을 이용해서 세팅하기
  // TODO: 디폴트 값을 getRamdomInt로 하면 되겠다
  // this.goRound = () => {
  this.goRound = (val = getRandomInt(0, 9)) => {
    if (val < 4) return;
    const newStop = $('.spinner-box', this.myTrack).cloneNode(true);
    this.$stop.remove();
    this.myTrack.insertAdjacentHTML('beforeend', go());
    this.$stop = newStop;
    this.myTrack.insertAdjacentElement('beforeend', this.$stop);
    this.distance++;
  };

  this.end = () => {
    this.$stop.remove();
  };

  this.getDistance = () => this.distance;

  this.getName = () => name;

  this.reset = () => {
    this.myTrack.remove();
  };
}
