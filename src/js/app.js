import CarNamesForm from './components/CarNamesForm.js';
import TryCountsForm from './components/TryCountsForm.js';
import store from './store/index.js';
import { delay, show } from './utils/utils.js';
import WinnerBoard from './components/WinnerBoard.js';
import { ACTIONS } from './constants.js';
import CarProgress from './components/CarProgress.js';

export class App {
  constructor() {
    this.$carNamesForm = new CarNamesForm();
    this.$tryCountsForm = new TryCountsForm();
    this.$winnerBoard = new WinnerBoard();

    this.$carNamesForm.render();
    this.$tryCountsForm.render();
    this.$winnerBoard.render();

    store.events.subscribe(ACTIONS.SET_CAR_NAMES, () => this.onSetCarNames());
    store.events.subscribe(ACTIONS.SET_PROCESS_MATRIX, () => this.onSetProcessMatrix());
    store.events.subscribe(ACTIONS.SET_WINNERS, () => this.onSetWinners());
  }

  onSetCarNames() {
    if (store.state.carNames.length === 0) return;
    show(this.$tryCountsForm.$element);
    this.$tryCountsForm.$tryCountsInput.focus();
  }

  onSetProcessMatrix() {
    if (store.state.winners.length === 0) return;
  }

  onSetWinners() {
    this.$winnerBoard.render();
    this.onStartRacing();
    await delay((store.state.tryCounts - 1) * 1000);
    this.onFinishRacing();
  }
}
