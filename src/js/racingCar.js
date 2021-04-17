'use strict';

import { $ } from './utils/dom.js';

class RacingCar {
  constructor() {
    this.$userInput = $('#user-input');
    this.$carNameInput = $('#input-car-name');
    this.$raceTimeInput = $('#input-race-time');
    this.$userInput.addEventListener('click', this.onClickSubmitBtn);
    this.carNames = [];
  }

  onClickSubmitBtn = ({ target }) => {
    if (target.matches('#submit-car-name')) {
      this.setRacingCars();
      return;
    }
    if (target.matches('#submit-race-time')) {
      return;
    }
  };

  setRacingCars() {
    const carNames = this.$carNameInput.value
      .split(',')
      .map(item => item.trim());
    this.carNames = carNames;

    console.log(this.carNames);
  }
}

export default RacingCar;
