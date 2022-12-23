import observer from '../core/observer.js';
import { store } from '../store/index.js';

class Player {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    observer.observe(() => {
      this.render();
    });
  }

  render() {
    const { racingMap, winners } = store.state;
    const isRacingEnd = winners.length > 0;
    const { carId, carName } = this.props;

    this.$target.innerHTML = /*html*/ `
      <div class="mr-2 progress-block-${carId}">
        <div class="car-player">${carName}</div>
        ${
          racingMap &&
          racingMap
            .get(carId)
            .map((isProgress) =>
              isProgress
                ? `
            <div class="forward-icon mt-2">⬇️️</div>
              `
                : ``
            )
            .join('')
        }
          ${
            isRacingEnd
              ? ''
              : `
            <div class="d-flex justify-center mt-3">
              <div class="relative spinner-container">
                <span class="material spinner"></span>
              </div>
            </div>
            `
          }
        </div>
      </div>
    `;
  }
}

export default Player;
