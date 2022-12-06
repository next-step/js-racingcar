import './css/index.css';
import App from './js/App';
import RaceModel from './js/Model/RaceModel';
import {
  $raceFormSection,
  $raceProcessSection,
  $raceResultSection,
} from './js/View/dom';
import RacingCarFormView from './js/View/RacingCarFormView';
import ProcessView from './js/View/ProcessView';
import RacingCarResultView from './js/View/RacingCarResultView';

new App(RaceModel, [
  { view: RacingCarFormView, target: $raceFormSection },
  { view: ProcessView, target: $raceProcessSection },
  { view: RacingCarResultView, target: $raceResultSection },
]);
