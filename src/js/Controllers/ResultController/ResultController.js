import { subscribe, RACE_STATES } from '../../Stores/race/index.js';
import { resultView } from '../../Views/ResultView.js';
import { resetViews } from '../../Views/index.js';
import { resetModels } from '../../Stores/index.js';

import { getWinnersName } from './ResultControllerUtils.js';

function setResult(raceState) {
  if (raceState.raceState !== RACE_STATES.DONE) return;

  resultView.show();

  const winners = getWinnersName(raceState.carStates);
  resultView.setResult(winners);
}

resultView.addEvent('resetButton', 'click', () => {
  resetViews();
  resetModels();
});

subscribe(setResult);
