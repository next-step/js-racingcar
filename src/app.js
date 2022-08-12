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

function app() {
  const raceApp = new App(model);

  raceApp.useController(CarPlayerNameForm);
  raceApp.useController(AttemptForm);
  raceApp.useController(RestartButton);
  raceApp.useView(ViewCarPlayerList);
  raceApp.useView(ViewCarPlayerNameForm);
  raceApp.useView(ViewAttemptForm);
  raceApp.useView(ViewResult);
  raceApp.useView(ViewWinner);

  raceApp.model.notify();
}

app();
