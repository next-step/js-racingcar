import App from './core/App.js';
import AttemptForm from './controller/Attempt/Form.js';
import CarPlayerNameForm from './controller/CarPlayer/NameForm.js';
import Result from './controller/Result.js';
import Winner from './controller/Winner.js';
import model from './model/index.js';
import CarPlayerList from './view/CarPlayer/List.js';

function main() {
  const app = new App(model);
  app.useController(CarPlayerNameForm);
  app.useController(AttemptForm);
  app.useController(Result);
  app.useController(Winner);
  app.useView(CarPlayerList);

  app.model.notify();
}

main();
