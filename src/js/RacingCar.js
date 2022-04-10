import { $ } from './dom.js';
import NameContainer from './container/NameContainer.js';
import NumberContainer from './container/NumberContainer.js';
import RacingCarContainer from './container/RacingCarContainer.js';
import store from './store/store.js';

class RacingCar {
  constructor() {
    this.$carName = $('.car-name');
    this.$carRacingNumber = $('.car-racing-number');
    this.$result = $('.result');

    this.render();
  }

  render() {
    const { cars, racingNumber } = store.getState();
    NameContainer(this.$carName);

    if (cars.length === 0) return;
    NumberContainer(this.$carRacingNumber);

    if (racingNumber === 0) return;
    RacingCarContainer(this.$result, cars, racingNumber);
  }
}

export default RacingCar;
