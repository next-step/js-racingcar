import Component from '../core/Component.js';
import { store } from '../store/index.js';
import { getProgressOrNot, waitUntil } from '../utils/index.js';

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
    this.state = { racingMap: [], isTrigger: false, isEnd: false };
  }

  async makeProgress() {
    if (!this.state.isTrigger) this.setState({ isTrigger: true });
    for (let i = 0; i < store.state.trialNumber; i++) {
      await waitUntil(700);

      this.setState({
        racingMap: [...this.state.racingMap, getProgressOrNot()],
      });
    }
  }

  checkEnd() {
    const endCondition =
      this.state.racingMap.length === StorageEvent.state.trialNumber;
    //*TODO: racingMap의 길이가 trialNumber와 같은 경우 store의 progressEnd state를 바꾸고
    //마지막 로딩을 화살표로 바꿔버리자.
    if (endCondition) {
      store.setState({ isRacingEnd: true });
    }
  }

  render() {
    this.wrapper.innerHTML = /*html*/ `
      <div class="mr-2 progress-block-${this.props.carId}">
        <div class="car-player">${this.props.carName}</div>
        ${this.state.racingMap
          .map((isProgress) =>
            isProgress
              ? `
            <div class="forward-icon mt-2">⬇️️</div>
              `
              : ``
          )
          .join('')}
          <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    if (!this.state.isTrigger) this.makeProgress();
  }
}
export default Player;
