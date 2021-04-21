'use strict';

import { $, $$ } from './utils/dom.js';
import { template } from './templates.js';
// import Car from './car.js';

class CarRaicingGame {
  constructor() {
    this.$userInputSection = $('#user-input-section');
    this.$raceTimeSection = $('#race-time-section');
    this.$raceProcessSection = $('#race-process-section');
    this.$raceResultSection = $('#race-result-section');
    this.$carNameInput = $('#input-car-name');
    this.$raceTimeInput = $('#input-race-time');

    this.$userInputSection.addEventListener('click', this.onClickSubmitBtn);
    // this.cars = [];
    this.carNames = [];
    this.raceTime = 0;
    this.timer = undefined;
  }

  onClickSubmitBtn = ({ target }) => {
    if (target.matches('#submit-car-name')) {
      this.setCar();
      return;
    }
    if (target.matches('#submit-race-time')) {
      this.setRaceTime();
      return;
    }
  };

  setCar() {
    console.log('setCar');

    this.$carNameInput.value.split(',').map(item => {
      const carName = item.trim();
      if (!carName) return;
      this.carNames.push(carName);
    });

    console.log(this.carNames);
    this.$carNameInput.readOnly = true;
    this.$raceTimeSection.style.visibility = 'visible';
  }

  setRaceTime() {
    console.log('setRaceTime');
    const time = this.$raceTimeInput.value;
    this.raceTime = Number(time);
    this.$raceTimeInput.readOnly = true;
    this.setProcess();
  }

  setProcess() {
    this.$raceProcessSection.style.visibility = 'visible';
    this.carNames.map(carName => {
      // const car = new Car(carName);
      // this.cars.push(car);
      this.$raceProcessSection.innerHTML += template.car(carName);
    });
    this.startRace();
  }

  async startRace() {
    const $cars = $$('.car');
    this.timer = await setInterval(() => {
      this.raceTime -= 1;
      $cars.forEach($car => {
        const $carProcess = $('.car-process', $car);
        const randomNumber = Math.random();
        if (randomNumber < 0.5) return;
        $carProcess.innerHTML += template.forward();
      });
      if (this.raceTime <= 0) clearInterval(this.timer);
    }, 1000);
    console.log('end');
    // const $spinner = $$('.spinner-container');
    // console.log($spinner);
  }

  fowardPcocess() {}

  setResult() {
    console.log('setResult');
    this.$raceResultSection.innerHTML += template.resultSection([
      '테스트1',
      '테스트2',
    ]);
  }
}

export default CarRaicingGame;
