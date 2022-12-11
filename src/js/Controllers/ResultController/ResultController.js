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
  let max = -1;
  const winnerName = [];

  carDistances.forEach(({ name, distance }) => {
    if (max < distance) {
      winnerName.length = 0;
      winnerName.push(name);
      max = distance;
      return;
    }

    if (max === distance) {
      winnerName.push(name);
      return;
    }

    return;
  });

  return winnerName;
}

subscribe(setResult);
