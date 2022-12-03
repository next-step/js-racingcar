import CarNameFormView from './views/car_name_form_view.js';

class App {
  constructor($target, model) {
    new CarNameFormView($target, model);
  }
}

export default App;
