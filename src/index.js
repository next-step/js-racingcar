import './css/index.css';
import App from './js/App';
import RaceModel from './js/Model/RaceModel';
import { $raceFormSection, $raceProcessSection } from './js/View/dom';
import FormView from './js/View/FormView';
import ProcessView from './js/View/ProcessView';

new App(RaceModel, [
 { view: FormView, target: $raceFormSection },
 { view: ProcessView, target: $raceProcessSection },
]);
