import './css/index.css';
import RaceModel from './js/Model/RaceModel';
import { $raceFormSection, $raceProcessSection } from './js/View/dom';
import FormView from './js/View/FormView';
import ProcessView from './js/View/ProcessView';

class App {
 constructor(Model, views) {
  const model = new Model();
  console.log(model);
  views.forEach(({ view, target }) => {
   new view(target, model);
  });
 }
}
new App(RaceModel, [
 { view: FormView, target: $raceFormSection },
 { view: ProcessView, target: $raceProcessSection },
]);
