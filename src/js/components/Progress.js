import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';
import Player from './Player.js';
class Progress extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  render() {
    if (!store.state.isVisibleProgress) return;

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

export default Progress;
