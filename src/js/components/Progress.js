import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';
import Player from './Player.js';
class Progress {
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

  checkFinishRacing() {
    const winner = this.getRacingWinner({ racingMap, trialNumber });

    if (isRacingEnd || !isVisibleProgress) return;

    if (winner.length) {
      return store.setState({
        isRacingEnd: true,
        winners: winner.join(','),
        isVisibleResult: true,
      });
    }
  }

  render() {
    const { isVisibleProgress, carNames } = store.state;

    if (!isVisibleProgress) {
      return (this.$target.innerHTML = '');
    }

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

export default Progress;
