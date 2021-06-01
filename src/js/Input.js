import { $ } from './utils/dom.js';

export class Input {
  constructor({ onSubmit }) {
    this.cars = [];
    this.raceTimes = 0;
    this.onSubmit = onSubmit;

    this.carNameInput = $('#input-car-name');
    this.carNameSubmitBtn = $('#submit-car-name');

    this.raceTimesInput = $('#input-race-times');
    this.raceTimesSubmitBtn = $('#submit-race-times');

    this.raceTimesSection = $('#section-race-times');

    this.initEventListener();
  }

  initEventListener() {
    this.carNameSubmitBtn.addEventListener('click', this.handleCarNameSubmit.bind(this));
    this.raceTimesSubmitBtn.addEventListener('click', this.handleRaceTimesSubmit.bind(this));
  }

  handleCarNameSubmit() {
    this.cars = this.carNameInput.value.split(',').map((name) => name.trim());
    const invalidNames = this.cars.filter((name) => !Input.isValidName(name));

    if (invalidNames.length > 0) {
      return alert('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다');
    }

    this.raceTimesSection.classList.remove('hidden');
    this.carNameSubmitBtn.disabled = true;
  }

  handleRaceTimesSubmit() {
    const raceTimes = Number(this.raceTimesInput.value);

    if (!Input.isValidTimes(raceTimes)) {
      return alert('입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.');
    }

    this.raceTimes = raceTimes;
    this.onSubmit?.({ cars: this.cars, raceTimes: this.raceTimes });
    this.raceTimesSubmitBtn.disabled = true;
  }

  reset() {
    this.cars = [];
    this.raceTimes = 0;

    this.carNameSubmitBtn.disabled = false;
    this.raceTimesSubmitBtn.disabled = false;

    this.carNameInput.value = '';
    this.raceTimesInput.value = '';

    this.raceTimesSection.classList.add('hidden');
  }

  static isValidName(name) {
    return name.length <= 5;
  }

  static isValidTimes(times) {
    return times > 0;
  }
}
