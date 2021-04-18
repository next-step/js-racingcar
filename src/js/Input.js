import { $ } from './utils/dom.js';

export class Input {
  constructor({ onSubmit }) {
    this.cars = [];
    this.raceTimes = 0;
    this.onSubmit = onSubmit;

    this.initEventListener();
  }

  initEventListener() {
    const carNameInput = $('#input-car-name');
    const carNameSubmitBtn = $('#submit-car-name');

    const raceTimesSection = $('#section-race-times');
    const raceTimesInput = $('#input-race-times');
    const raceTimesSubmitBtn = $('#submit-race-times');

    carNameSubmitBtn.addEventListener('click', () => {
      this.cars = carNameInput.value.split(',');
      raceTimesSection.classList.remove('hidden');
    });

    raceTimesSubmitBtn.addEventListener('click', () => {
      this.raceTimes = Number(raceTimesInput.value);
      this.onSubmit?.({ cars: this.cars, raceTimes: this.raceTimes });
    });
  }
}
