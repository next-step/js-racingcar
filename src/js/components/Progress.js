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
      <div class="mr-2">
        <div class="car-player">${this.props.carName}</div>
        <div class="forward-icon mt-2">⬇️️</div>
        <div class="forward-icon mt-2">⬇️️</div>
      </div>
    `;
  }
}

class Progress extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  template() {
    return /*html*/ `
      <div class="mt-4 d-flex progress-container">
       <!-- <div class="mr-2">
          <div class="car-player">EAST</div>
          <div class="forward-icon mt-2">⬇️️</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>
        <div class="mr-2">
          <div class="car-player">WEST</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>
        <div class="mr-2">
          <div class="car-player">SOUTH</div>
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
        <div class="mr-2">
          <div class="car-player">NORTH</div>
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div> -->
      </div>
  `;
  }

  mounted() {
    this.$target.innerHTML = this.template();
  }

  render() {
    const { $target } = this;
    if (store.state.isVisibleProgress) {
      console.log(splitingCarNames(store.state.carNames));
      splitingCarNames(store.state.carNames)
        .map((carName, idx) => {
          console.log(
            carName,
            idx,
            this.$target,
            this.$target.querySelector('.progress-container')
          );
          new Player({
            $target: this.$target,
            props: { carName },
          });
        })
        .join('');
    }

    if (!store.state.isVisibleProgress && this.$target.innerHTML.length) {
      this.$target.innerHTML = '';
    }
  }
}

export default Progress;
