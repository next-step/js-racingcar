import { subscribe } from '../../Models/race.js';
import { resultView } from '../../Views/ResultView.js';
import { resetViews } from '../../Views/index.js';
import { resetModels } from '../../Models/index.js';

import { getWinnersName } from './ResultControllerUtils.js';

function setResult(raceState) {
  if (raceState.raceState !== 'done') return;

  resultView.show();

  const winners = getWinnersName(raceState.carDistances);
  resultView.setResult(winners);

  resultView.addResetButtonClickListener(() => {
    resetViews();
    resetModels();
  });
}

subscribe(setResult);
