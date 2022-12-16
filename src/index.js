import './css/index.css';
import App from './js/App';
import RaceModel from './js/Model/RaceModel';
import {
  $raceFormSection,
  $raceProcessSection,
  $raceResultSection,
} from './js/View/dom';
import RacingCarFormView from './js/View/RacingCarFormView';
import RacingCarProcessView from './js/View/RacingCarProcessView';
import RacingCarResultView from './js/View/RacingCarResultView';

new App(RaceModel, [
  { view: RacingCarFormView, target: $raceFormSection },
  { view: RacingCarProcessView, target: $raceProcessSection },
  { view: RacingCarResultView, target: $raceResultSection },
]);
