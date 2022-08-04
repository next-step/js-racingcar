import AttemptForm from './controller/AttemptForm.js';
import BaseController from './controller/BaseController.js';
import CarPlayerList from './controller/CarPlayerList.js';
import CarPlayerNameForm from './controller/CarPlayerNameForm.js';
import Result from './controller/Result.js';
import Winner from './controller/Winner.js';


function App() {
  const state = {
    carPlayerNames: [],
    attempt: 0,
  };
  new CarPlayerList(state);
  new CarPlayerNameForm(state);
  new AttemptForm(state);
  new Result(state);
  new Winner(state);

  BaseController.render();
}

App();
