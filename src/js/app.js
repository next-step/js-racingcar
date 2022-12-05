import CarNameForm from './components/car_name_form.js';
import CarRaceCountForm from './components/car_race_count_form.js';
import CarRace from './components/car_race.js';

class App {
  constructor($target, model) {
    new CarNameForm($target, model);
    new CarRaceCountForm($target, model);
    new CarRace($target, model);
  }
}

export default App;
