import { dispatch, getState, actions } from '../../Models/global/index.js';
import { dispatch as dispatchRaceState, actions as raceActions } from '../../Models/race/index.js';
import { countInputSetView } from '../../Views/CountInputView.js';
import { raceTrackView } from '../../Views/RaceTrackView/RaceTrackView.js';

countInputSetView.addButtonClickListener(({ inputElement }) => {
  const iterationCount = inputElement.value;
  if (!iterationCount) {
    alert('횟수를 입력해주세요!');
    return;
  }

  dispatch(actions.ITERATION_COUNT, Number(iterationCount));
  countInputSetView.disable();

  const { carNames } = getState();
  raceTrackView.show();
  raceTrackView.readyRaceTrack(carNames);
  dispatchRaceState(raceActions.READY, carNames);
});
