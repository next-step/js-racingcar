import UserRacingInput from './components/UserRacingInput.js';
import State from './model/State.js';

const App = () => {
  const state = State.getInstance();

  UserRacingInput({
    setGames: state.setGames,
    updateGameConfiguration: state.updateGameConfiguration,
  });
};

App();
