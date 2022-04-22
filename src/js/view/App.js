import AbstractView from './AbstractView.js';
import RacingCarNamesView from './RacingCarNamesView.js';
import RacingCycleView from './RacingCycleView.js';
import RacingSectionView from './RacingSectionView.js';

class IApp extends AbstractView {
  eventBindings() {
    RacingCarNamesView.eventBindings();
    RacingCycleView.eventBindings(this.initialize);
  }

  initialize() {
    RacingCarNamesView.initialize();
    RacingCycleView.initialize();
    RacingSectionView.initialize();
  }
}
const App = new IApp();
Object.freeze(App);
export default App;
