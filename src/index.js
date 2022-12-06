import './css/index.css';
import App from './js/App';
import RaceModel from './js/Model/RaceModel';
import { $raceFormSection, $raceProcessSection } from './js/View/dom';
import RacingCarFormView from './js/View/RacingCarFormView';
import ProcessView from './js/View/ProcessView';

new App(RaceModel, [
  { view: RacingCarFormView, target: $raceFormSection },
  { view: ProcessView, target: $raceProcessSection },
]);
