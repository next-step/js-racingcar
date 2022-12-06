import { countInputSetView } from '../Views/CountInputView.js';
import { raceTrackView } from '../Views/RaceTrackView/RaceTrackView.js';

countInputSetView.onClick({
  onClickButton: ({ inputElement }) => {
    const value = inputElement.value;
    if (!value) {
      alert('횟수를 입력해주세요!');
      return;
    }

    // TODO: dispatch Model
    countInputSetView.disable();
    raceTrackView.show();
  },
});
