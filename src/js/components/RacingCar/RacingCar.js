import { $, $getElement } from '../../dom.js';
import { FORWRAD, RANDOM_MAX, RANDOM_MIN } from '../../constants.js';

import GoRacingCar from '../../components/RacingCar/GoRacingCar.js';
import SpinnerRacingcar from '../../components/RacingCar/SpinnerRacingCar.js';
import { getRandom } from '../../utils.js';

class RacingCar {
  constructor(carName) {
    this.score = 0;
    this.carName = carName;
    this.$target = $getElement(this.template());
  }

  template() {
    return `
  		<div class="car-racing mr-2">
  			<div class="car-player">${this.carName}</div>
        <div class="stop-car d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
  		</div>
  	`;
  }
  runCar() {
    this.forwardCar();
  }

  forwardCar() {
    const isForward = getRandom(RANDOM_MIN, RANDOM_MAX) >= FORWRAD;

    if (!isForward) {
      return;
    }

    this.$target.insertBefore(
      $getElement(GoRacingCar),
      $('.stop-car', this.$target)
    );
    this.score++;
  }

  endRunCar() {
    $getElement(GoRacingCar), $('.stop-car', this.$target).remove();
  }
}
export default RacingCar;
