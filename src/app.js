import App from './core/App.js';
import model from './model/index.js';
import ViewAttemptForm from './view/Attempt/Form.js';
import ViewAttemptInput from './view/Attempt/Input.js';
import ViewCarPlayerNameForm from './view/CarPlayer/NameForm.js';
import ViewCarPlayerNameInput from './view/CarPlayer/NameInput.js';
import ViewCarPlayerList from './view/CarPlayer/List.js';
import ViewRestartButton from './view/RestartButton.js';
import ViewResult from './view/Result.js';
import ViewWinner from './view/Winner.js';
import ControllerRace from './controller/Race.js';

function app() {
  const raceApp = new App(model);

  raceApp.useController(ControllerRace);

  raceApp.useView(ViewAttemptForm);
  raceApp.useView(ViewAttemptInput);
  raceApp.useView(ViewCarPlayerNameForm);
  raceApp.useView(ViewCarPlayerNameInput);
  raceApp.useView(ViewCarPlayerList);
  raceApp.useView(ViewRestartButton);
  raceApp.useView(ViewResult);
  raceApp.useView(ViewWinner);

  raceApp.model.notify();
}

app();
