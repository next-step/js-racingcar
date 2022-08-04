import AttemptForm from './controller/AttemptForm.js';
import BaseController from './controller/BaseController.js';
import CarPlayerList from './controller/CarPlayerList.js';
import CarPlayerNameForm from './controller/CarPlayerNameForm.js';

function App() {
  const state = {
    carPlayerNames: [],
    attempt: 0,
  };
  new CarPlayerList(state);
  new CarPlayerNameForm(state);
  new AttemptForm(state);

  BaseController.render();
}

App();
