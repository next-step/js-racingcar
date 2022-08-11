import App from './core/App.js';
import AttemptForm from './controller/Attempt/Form.js';
import CarPlayerNameForm from './controller/CarPlayer/NameForm.js';
import Result from './controller/Result.js';
import Winner from './controller/Winner.js';
import model from './model/index.js';
import ViewCarPlayerList from './view/CarPlayer/List.js';
import ViewCarPlayerNameForm from './view/CarPlayer/NameForm.js';

function main() {
  const app = new App(model);
  app.useController(CarPlayerNameForm);
  app.useController(AttemptForm);
  app.useController(Result);
  app.useController(Winner);
  app.useView(ViewCarPlayerList);
  app.useView(ViewCarPlayerNameForm);

  app.model.notify();
}

main();
