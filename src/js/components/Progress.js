import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { splitingCarNames } from '../utils/index.js';

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
    this.wrapper.innerHTML = /*html*/ `
      <div class="mr-2 progress-block-${this.props.carId}">
        <div class="car-player">${this.props.carName}</div>

        </div>
      </div>
    `;
  }
}

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

  mounted() {
    this.$target.innerHTML = this.template();
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
