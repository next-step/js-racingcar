import { $on, $ } from '../utils/helpers.js';
import GameProcess from './GameProcess.js';
import RacingInputs from './RacingInputs.js';
import ResultPane from './ResultPane.js';

export default function Racing(app) {
  const racingInputs = new RacingInputs(this);
  const resultPane = new ResultPane($('.result-pane'));
  const gameProcess = new GameProcess($('.game-process-component'));

  this.carNames = [];
  this.round = 0;
  this.setCarNames = () => (this.carNames = racingInputs.getNames());
  this.setRound = () => (this.round = racingInputs.getRounds());

  this.startGame = () => {
    gameProcess.ready(this.carNames);
    gameProcess.start(this.round, resultPane.showWinner);
  };

  this.resetGame = () => {
    racingInputs.reset();
    resultPane.reset();
    gameProcess.reset();
  };

  const clickEventHandler = (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    // TODO: if ... else 문이 아닌 멋있는 방법을 찾아보자.
    if (target.classList.contains('car-names__btn')) {
      this.setCarNames();
    } else if (target.classList.contains('try-number__btn')) {
      if (!this.setRound()) return;
      this.startGame();
    } else if (target.classList.contains('result-pane__btn')) {
      this.resetGame();
    }
  };

  $on(app, 'click', clickEventHandler);
  // TODO: 엔터에도 동작하게 만들기
  // $on(app, 'keyUp', clickEventHandler);
}
