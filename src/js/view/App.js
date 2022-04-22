import RacingCarNamesView from './RacingCarNamesView.js';
import RacingCycleView from './RacingCycleView.js';
import RacingSectionView from './RacingSectionView.js';

const $app = document.querySelector('#app');

const App = (function () {
  function isCarNameSubmit(id) {
    return id === 'car-names-submit';
  }

  function isRacingCycleSubmit(id) {
    return id === 'racing-cycle-submit';
  }

  function isRestartRaceSubmit(id) {
    return id === 'restart';
  }

  function initialize() {
    RacingCarNamesView.initialize();
    RacingCycleView.initialize();
    RacingSectionView.initialize();
  }

  function eventBindings() {
    $app.addEventListener('click', (event) => {
      const { id } = event.target;
      if (isCarNameSubmit(id)) {
        RacingCarNamesView.carNameSubmit();
        return;
      }

      if (isRacingCycleSubmit(id)) {
        RacingCycleView.cycleSubmit();
        return;
      }

      if (isRestartRaceSubmit(id)) {
        initialize();
      }
    });
  }

  return { initialize, eventBindings };
})();
export default App;
