import { $ } from '../utils/helpers.js';
import getRandomInt from '../utils/getRandomInt.js';

const track = (name) => {
  return `
        <div class="mr-2" data-car=${name}>
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

export default function RacingCar(name) {
  this.distance = 0;
  this.isStay = false;

  this.ready = (racingTrack) => {
    racingTrack.insertAdjacentHTML('beforeend', track(name));
    this.myTrack = $(`[data-car="${name}"]`);
    this.$stop = document.createElement('div');
    this.$stop.className = 'd-flex justify-center mt-3 spinner-box';
    this.$stop.insertAdjacentHTML('beforeend', spinner());
    this.myTrack.insertAdjacentElement('beforeend', this.$stop);
  };

  this.goRound = () => {
    if (getRandomInt(0, 9) > 3) {
      const newStop = $('.spinner-box', this.myTrack).cloneNode(true);
      this.$stop.remove();
      this.myTrack.insertAdjacentHTML('beforeend', go());
      this.$stop = newStop;
      this.myTrack.insertAdjacentElement('beforeend', this.$stop);
      this.distance++;
    }
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
