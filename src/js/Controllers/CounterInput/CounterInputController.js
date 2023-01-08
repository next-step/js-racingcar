import { dispatch, getState, actions } from '../../Stores/global/index.js';
import { dispatch as dispatchRaceState, actions as raceActions } from '../../Stores/race/index.js';
import { countInputSetView } from '../../Views/CountInputView.js';
import { raceTrackView } from '../../Views/RaceTrackView/RaceTrackView.js';

const onSubmitListener = () => {
  const iterationCount = countInputSetView.getInputValue();
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
}

countInputSetView.addEvent('submitButton', 'click', onSubmitListener);
countInputSetView.addEvent('rootElement', 'keypress', (e) => {
  if (e.key === 'Enter') {
    e.stopPropagation();
    onSubmitListener(e);
  }
});
