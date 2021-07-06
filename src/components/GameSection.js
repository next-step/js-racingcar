import Component from '../core/Component.js';
import Arrow from './Arrow.js';
import Loader from './Loader.js';

export default class GameSection extends Component {
  mount() {
    this.$target.innerHTML = `
      <section id="game-section" class="d-flex justify-center mt-5">
        <div id="game-area" class="mt-4 d-flex">
          ${this.props.cars.getState.reduce((html, car) => {
            return (html += this.renderCarNames(car));
          }, '')}
        </div>
      </section>
    `;
  }

  renderCarNames(car) {
    return `
      <div class="mr-2">
        <div class="car-player">${car.carName}</div>
        ${Arrow().repeat(car.distance)}
        ${this.props.raceCount.getState ? Loader() : ''}
      </div>
    `;
  }
}
