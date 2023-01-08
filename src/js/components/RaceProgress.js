import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/carName.js';
import CarPlayer from './CarPlayer.js';
class RaceProgress {
  constructor({ $target }) {
    this.$target = $target;

    observer.observe(() => {
      this.render();
    });
  }

  getRacingWinner = ({ racingMap, trialNumber }) => {
    if (!racingMap || !racingMap.size) return false;

    return [...racingMap.keys()]
      .map((carId) => {
        const progressArray = racingMap.get(carId);
        if (progressArray.filter((el) => el === true).length === Number(trialNumber)) {
          return this.getCarNameInCarId(carId);
        }
      })
      .filter((el) => Boolean(el));
  };

  render() {
    const { isVisibleProgress, carNames } = store.state;

    if (!isVisibleProgress) {
      this.$target.innerHTML = '';
      return;
    }

    splitingCarNames(carNames)
      .map((carName, idx) => {
        const carId = `${carName}-${idx}`;
        const $wrapper = document.createElement('div');
        $wrapper.setAttribute('class', 'mr-2');
        this.$target.append($wrapper);

        new CarPlayer({
          $target: $wrapper,
          props: { carName, carId },
        });
      })
      .join('');
  }
}

export default RaceProgress;
