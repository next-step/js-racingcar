import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';
import Player from './Player.js';
class Progress extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
    this.state = {
      racingMap: new Map(),
      isEnd: false,
    };
  }

  template() {
    return /*html*/ `
      <div class="mt-4 d-flex progress-container">
      </div>
  `;
  }

  render() {
    if (store.state.isVisibleProgress) {
      splitingCarNames(store.state.carNames)
        .map((carName, idx) => {
          const carId = `${carName}-${idx}`;

          new Player({
            $target: this.$target,
            props: { carName, carId },
          });
        })
        .join('');
    }
  }
}

export default Progress;
