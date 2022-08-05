import RacingCar from './Model.js';
import Controller from './Controller.js';
import CarNameFormView from './views/CarNameFormView.js';
import RaceCountFormView from './views/RaceCountFormView.js';
import RacingProgressView from './views/RacingProgressView.js';
import RacingResultView from './views/RacingResultView.js';

document.addEventListener('DOMContentLoaded', App);

function App() {
  const model = new RacingCar();
  const views = {
    carNameFormView: new CarNameFormView(),
    raceCountFormView: new RaceCountFormView(),
    racingProgressView: new RacingProgressView(),
    racingResultView: new RacingResultView(),
  };

  new Controller(model, views);
}
