import CarNamesForm from './components/CarNamesForm.js';
import TryCountsForm from './components/TryCountsForm.js';
import store from './store/index.js';
import { delay, hide, show } from './utils/utils.js';
import WinnerBoard from './components/WinnerBoard.js';
import { ACTIONS, DONE_MESSAGE, ONE_SECOND } from './constants.js';
import CarProgress from './components/CarProgress.js';
import CarProgressContainer from './components/CarProgressContainer.js';

export class App {
  constructor() {
    this.$carNamesForm = new CarNamesForm();
    this.$tryCountsForm = new TryCountsForm();
    this.$winnerBoard = new WinnerBoard();
    this.$carProgressContainer = new CarProgressContainer();

    this.$carNamesForm.render();
    this.$tryCountsForm.render();
    this.$winnerBoard.render();
    this.$carProgressContainer.render();

    store.events.subscribe(ACTIONS.SET_CAR_NAMES, () => this.onSetCarNames());
    store.events.subscribe(ACTIONS.SET_WINNERS, () => this.onSetWinners());
    store.events.subscribe(ACTIONS.INIT_STATE, () => this.onInitState());
  }

  onSetCarNames() {
    if (store.state.carNames.length === 0) return;
    show(this.$tryCountsForm.$element);
    this.$tryCountsForm.$tryCountsInput.focus();
  }

  onStartRacing() {
    show(this.$carProgressContainer.$element);
    store.state.carNames.forEach((carName, index) => {
      const carProgress = new CarProgress(carName, store.state.progressMatrix[index]);
      carProgress.render();
      carProgress.start();
    });
  }

  async onFinishRacing() {
    show(this.$winnerBoard.$element);

    await delay(2000);
    alert(DONE_MESSAGE);
  }

  async onSetWinners() {
    this.$winnerBoard.render();
    this.onStartRacing();
    await delay((store.state.tryCounts - 1) * ONE_SECOND);
    this.onFinishRacing();
  }

  onInitState() {
    hide(this.$tryCountsForm.$element);
    hide(this.$winnerBoard.$element);
    hide(this.$carProgressContainer.$element);

    this.$carProgressContainer.render();

    this.$carNamesForm.$element.reset();
    this.$tryCountsForm.$element.reset();
  }
}
