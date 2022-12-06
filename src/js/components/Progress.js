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
    if (!isVisibleProgress) return;

    splitingCarNames(carNames)
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

export default Progress;
