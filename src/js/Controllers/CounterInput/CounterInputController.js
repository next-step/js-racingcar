import { dispatch, getState } from '../../Models/global.js';
import { dispatch as dispatchRaceState } from '../../Models/race.js';
import { countInputSetView } from '../../Views/CountInputView.js';
import { raceTrackView } from '../../Views/RaceTrackView/RaceTrackView.js';

countInputSetView.addButtonClickListener(({ inputElement }) => {
  const iterationCount = inputElement.value;
  if (!iterationCount) {
    alert('횟수를 입력해주세요!');
    return;
  }

  dispatch('iterationCount', Number(iterationCount));
  countInputSetView.disable();

  const { carNames } = getState();
  raceTrackView.show();
  raceTrackView.readyRaceTrack(carNames);
  dispatchRaceState('ready', carNames);
});
