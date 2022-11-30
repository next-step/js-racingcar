import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';

class Player extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
    this.props = props;
  }
  template() {
    return /*html*/ `
      <div class="mr-2">
        <div class="car-player">EAST</div>
        <div class="forward-icon mt-2">⬇️️</div>
        <div class="forward-icon mt-2">⬇️️</div>
      </div>
    `;
  }
}

class Progress extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  render() {
    if (store.state.isVisibleProgress) {
      this.$target.innerHTML = this.template();
      splitingCarNames(store.state.carNames).map((carName) => {
        new Player({
          $target: this.$target.querySelector('.progress-wrapper'),
          props: { carName },
        });
      });
    }

    if (!store.state.isVisibleProgress && this.$target.innerHTML.length) {
      this.$target.innerHTML = '';
    }
  }

  template() {
    return /*html*/ `
      <div class="mt-4 d-flex progress-wrapper">
        <div class="mr-2">
          <div class="car-player">EAST</div>
          <div class="forward-icon mt-2">⬇️️</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>
        <div class="mr-2">
          <div class="car-player">WEST</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>
        <div class="mr-2">
          <div class="car-player">SOUTH</div>
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
        <div class="mr-2">
          <div class="car-player">NORTH</div>
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
      </div>
  `;
  }
}

export default Progress;
