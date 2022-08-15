import RacingCar from './RacingCar.js';
import Controller from './Controller.js';
import { CarNameFormView, RaceCountFormView, RacingProgressView, RacingResultView } from './views/index.js';

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

export default App;
