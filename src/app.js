import AttemptInput from './controller/AttemptInput.js';
import CarPlayerList from './controller/CarPlayerList.js';
import CarPlayerNameForm from './controller/CarPlayerNameForm.js';

function App() {
  const state = {
    carPlayerNames: [],
  };
  new CarPlayerList(state);
  new CarPlayerNameForm(state);
  new AttemptInput();
}

App();
