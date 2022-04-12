import AbstractView from './AbstractView.js';
import RacingCarNamesView from './RacingCarNamesView.js';
import RacingCycleView from './RacingCycleView.js';
import RacingSectionView from './RacingSectionView.js';

export default class RacingGameView extends AbstractView {
  static eventBindings() {
    RacingCarNamesView.eventBindings();
    RacingCycleView.eventBindings(RacingGameView.initialize);
  }

  static initialize() {
    RacingCarNamesView.initialize();
    RacingCycleView.initialize();
    RacingSectionView.initialize();
  }
}
