import App from './core/App.js';
import AttemptForm from './controller/Attempt/Form.js';
import CarPlayerList from './controller/CarPlayer/List.js';
import CarPlayerNameForm from './controller/CarPlayer/NameForm.js';
import Result from './controller/Result.js';
import Winner from './controller/Winner.js';
import model from './model/index.js';

function main() {
  const app = new App(model);
  app.useController(CarPlayerList);
  app.useController(CarPlayerNameForm);
  app.useController(AttemptForm);
  app.useController(Result);
  app.useController(Winner);

  app.model.notify();
}

main();
