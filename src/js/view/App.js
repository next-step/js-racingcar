import RacingCarNamesView from './RacingCarNamesView.js';
import RacingCycleView from './RacingCycleView.js';
import RacingSectionView from './RacingSectionView.js';

const $app = document.querySelector('#app');

function isCarNameSubmit(id) {
  return id === 'car-names-submit';
}

function isRacingCycleSubmit(id) {
  return id === 'racing-cycle-submit';
}

function isRestartRaceSubmit(id) {
  return id === 'restart';
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
      // eslint-disable-next-line no-use-before-define
      initialize();
    }
  });
}

function initialize() {
  eventBindings();
  RacingCarNamesView.initialize();
  RacingCycleView.initialize();
  RacingSectionView.initialize();
}

export { initialize };
