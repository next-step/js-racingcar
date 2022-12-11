import { subscribe } from '../../Models/race.js';
import { resultView } from '../../Views/ResultView.js';
import { resetViews } from '../../Views/index.js';
import { resetModels } from '../../Models/index.js';

function setResult(raceState) {
  if (raceState.raceState !== 'done') return;

  resultView.show();

  const winners = getWinnersName(raceState.carDistances);
  resultView.setResult(winners);

  resultView.onClick({
    onClickResetButton: () => {
      resetViews();
      resetModels();
    },
  });
}

export function getWinnersName(carDistances) {
  const winnerDistance = Math.max(...carDistances.map(car => car.distance));
  return carDistances.filter(car => car.distance === winnerDistance);
}

subscribe(setResult);
