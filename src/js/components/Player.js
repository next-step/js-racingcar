import Component from '../core/Component.js';
import store from '../core/Store.js';

class Player extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
    this.props = props;
    this.wrapper;
  }

  mounted() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'mr-2');

    this.$target.append(wrapper);
    this.wrapper = wrapper;
  }

  render() {
    const racingMap = store.getState({ name: 'racingMap', that: this });
    const isRacingEnd = store.getState({ name: 'isRacingEnd', that: this });
    if (!racingMap) return;

    this.wrapper.innerHTML = /*html*/ `
      <div class="mr-2 progress-block-${this.props.carId}">
        <div class="car-player">${this.props.carName}</div>
        ${racingMap
          .get(this.props.carId)
          .map((isProgress) =>
            isProgress
              ? `
            <div class="forward-icon mt-2">⬇️️</div>
              `
              : ``
          )
          .join('')}
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
