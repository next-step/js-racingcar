import App from './core/App.js';
import AttemptForm from './controller/Attempt/Form.js';
import CarPlayerNameForm from './controller/CarPlayer/NameForm.js';
import RestartButton from './controller/RestartButton.js';
import model from './model/index.js';
import ViewCarPlayerList from './view/CarPlayer/List.js';
import ViewCarPlayerNameForm from './view/CarPlayer/NameForm.js';
import ViewAttemptForm from './view/AttemptForm.js';
import ViewResult from './view/Result.js';
import ViewWinner from './view/Winner.js';

function main() {
  const app = new App(model);
  app.useController(CarPlayerNameForm);
  app.useController(AttemptForm);
  app.useController(RestartButton);
  app.useView(ViewCarPlayerList);
  app.useView(ViewCarPlayerNameForm);
  app.useView(ViewAttemptForm);
  app.useView(ViewResult);
  app.useView(ViewWinner);

  app.model.notify();
}

main();
