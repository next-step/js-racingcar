import { getRandomInteger } from '../Utils/util.js';
import { START, END } from '../Constants/constants.js';

export default class Car {
  constructor(name) {
    this.name = name;
    this.currentPos = 0;
  }

  goFoward() {
    const randValue = getRandomInteger(START, END);
    if (randValue >= 4) this.currentPos++; 
  }
}
