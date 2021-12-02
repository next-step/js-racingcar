import { $ } from '../util/dom.js';
import View from './View.js';

export default class PlaySection extends View {
  #template = /* html */ `
    <div id="playWrapper" class="mt-4 d-flex justify-center"></div>
  `;
  constructor(el) {
    super(el);
    this.render();
    this.$playWrapper = $('#playWrapper');
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('beforeend', this.#template);
  }

  renderRacingCar(racingCars) {
    const carNamesElements = racingCars
      .map((carName) => {
        return /* html */ `
        <div class="mr-2 racingcar" data-car-player=${carName}>
          <div class="car-player">${carName}</div>
        </div>
      `;
      })
      .join('');

    this.$playWrapper.insertAdjacentHTML('beforeend', carNamesElements);

    this.$target.replaceChildren();
    this.$target.appendChild(this.$playWrapper);
  }
}
