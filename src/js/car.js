'use strict';

import { $ } from './utils/dom.js';
import { template } from './templates.js';

class Car {
  constructor(name) {
    this.name = name;
    this.id = uuid();
  }

  getProcessTemplate() {
    console.log('Car - getProcessTemplate');
    const carInfo = {
      name: this.name,
      id: this.id,
    };
    return template.car(carInfo);
  }

  startRace() {
    setTimeout(() => {
      const $car = $(`#${this.id}`);
      console.log('startRace', $car);
    }, 1000);
  }
}

export default Car;
