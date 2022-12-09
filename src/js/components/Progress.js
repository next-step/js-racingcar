import Component from '../core/Component.js';
import store from '../core/Store.js';
import { splitingCarNames } from '../utils/index.js';
import Player from './Player.js';
class Progress extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  render() {
    const isVisibleProgress = store.getState({
      name: 'isVisibleProgress',
      that: this,
    });

    const carNames = store.getState({
      name: 'carNames',
      that: this,
    });
    if (!isVisibleProgress) {
      this.$target.innerHTML = '';
    } else {
      splitingCarNames(carNames)
        .map((carName, idx) => {
          const carId = `${carName}-${idx}`;
          const $wrapper = document.createElement('div');
          $wrapper.setAttribute('class', 'mr-2');
          this.$target.append($wrapper);

          new Player({
            $target: $wrapper,
            props: { carName, carId },
          });
        })
        .join('');
    }
  }
}

export default Progress;
