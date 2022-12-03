import CarNameFormView from './views/carNameFormView/car_name_form_view.js';

class App {
  constructor($target, model) {
    new CarNameFormView($target, model);
  }
}

export default App;
