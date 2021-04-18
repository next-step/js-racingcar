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
      const invalidNames = this.cars.filter((name) => !Input.isValidName(name));

      if (invalidNames.length > 0) {
        return alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다');
      }

      raceTimesSection.classList.remove('hidden');
    });

    raceTimesSubmitBtn.addEventListener('click', () => {
      const raceTimes = Number(raceTimesInput.value);

      if (!Input.isValidTimes(raceTimes)) {
        return alert('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.');
      }

      this.raceTimes = raceTimes;
      this.onSubmit?.({ cars: this.cars, raceTimes: this.raceTimes });
    });
  }

  reset() {
    this.cars = [];
    this.raceTimes = 0;
    const raceTimesSection = $('#section-race-times');
    raceTimesSection.classList.add('hidden');
  }

  static isValidName(name) {
    return name.length <= 5;
  }

  static isValidTimes(times) {
    return times > 0;
  }
}
