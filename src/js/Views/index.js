import { carNameInputSetView } from './CarNameInputView.js';
import { countInputSetView } from './CountInputView.js'
import { raceTrackView } from './RaceTrackView/RaceTrackView.js';
import { resultView } from './ResultView.js';

export function resetViews() {
  const views = [carNameInputSetView, countInputSetView, raceTrackView, resultView];
  views.forEach(({ init }) => init());
}
