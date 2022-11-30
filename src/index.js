import './css/index.css';
import RaceModel from './js/Model/RaceModel';
import { $raceFormSection } from './js/View/dom';
import FormView from './js/View/FormView';

class App {
 constructor(Model, views) {
  this.raceModel = new Model();
  views.forEach(({ view, target }) => {
   new view(target, this.raceModel);
  });
 }
}
new App(RaceModel, [{ view: FormView, target: $raceFormSection }]);
