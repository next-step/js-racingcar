import CarNameFormView from './views/car_name_form_view.js';
import CarRaceCountFormView from './views/car_race_count_form_view.js';
import CarRaceView from './views/car_race_view.js';

class App {
  constructor($target, model) {
    new CarNameFormView($target, model);
    new CarRaceCountFormView($target, model);
    new CarRaceView($target, model);
  }
}

export default App;
