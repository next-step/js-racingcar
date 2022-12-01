import Component from '../core/Component.js';
import { store } from '../store/index.js';

const Direction = () => {
  return /*html*/ `<div class="forward-icon mt-2">⬇️️</div>`;
};

const Spinner = () => {
  return /*html*/ `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  `;
};

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
    console.log({ carId: this.props.carId, store: store.state.racingMap });
    this.wrapper.innerHTML = /*html*/ `
      <div class="mr-2 progress-block-${this.props.carId}">
        <div class="car-player">${this.props.carName}</div>
          ${Spinner()}
          ${Direction()}
        </div>
      </div>
    `;
  }
}
export default Player;
