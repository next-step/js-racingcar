import { ERROR, EVENT, MESSAGE } from '../../Constants/Constans.js';
import Component from '../../core/Component/Component.js';
import { actions } from '../../modules/actions.js';
import { canPlayGame } from '../../util/carUtil.js';
import { delegate } from '../../util/helper.js';
import { showAlert } from '../../util/showAlert.js';

class CarWinnerArea extends Component {
  constructor($target, $props, store) {
    super($target, $props, store);
  }

  _sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  setup() {
    const { cars, winner, times, isPlaying } = this.$store.getState();
    this.cars = cars;
    this.winner = winner;
    this.times = times;
    this.isPlaying = isPlaying;
  }

  async playGame() {
    for (let time = 0; time < this.times; time++) {
      this.$store.dispatch(actions.BEFORE_PLAY_LOADING());
      await this._sleep(1000);
      this.$store.dispatch(actions.PLAY_ONE_ROUND(this.cars));
    }
    this.setup();

    this.$store.dispatch(actions.CHOOSE_WINNER(this.cars));

    await this._sleep(2000);

    this.setup();
    return showAlert(MESSAGE.CONGRATULATIONS(this.winner));
  }

  setEvent() {
    delegate(this.$target, EVENT.CLICK, 'button', () => {
      if (!canPlayGame(this.cars, this.times)) {
        return showAlert(ERROR.INVAILD_START_CONDITION);
      }
      this.$store.dispatch(actions.RESET_CAR_STATE());
      this.playGame();
    });
  }

  template() {
    return this.winner.length > 0
      ? `
        <div>
          <h2>${MESSAGE.WINNER(this.winner)}
          </h2>
          <div class="d-flex justify-center">
          ${
            this.isPlaying
              ? ''
              : `<button type="button" class="btn btn-cyan" id="start-btn">다시 시작하기</button>`
          }
          </div>
        </div>
        `
      : `
        <div>
          <h2>${MESSAGE.WHO_IS_WINNER}</h2>
          <div class="d-flex justify-center">
          ${
            this.isPlaying
              ? ''
              : `<button type="button" class="btn btn-cyan" id="start-btn">시작하기</button>`
          }
          </div>
        </div> 
        `;
  }
}

export default CarWinnerArea;
