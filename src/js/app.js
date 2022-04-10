// components
import UserRacingInput from './components/UserRacingInput.js';
import GameProcess from './components/GameProcess.js';
// models
import GameProcessModel from './model/GameProcessModel.js';

import State from './model/State.js';

const App = async () => {
  const state = State.getInstance();

  const startGame = () => {
    GameProcess({
      gameProcessState: new GameProcessModel(state.gameProcessState),
    });
  };

  UserRacingInput({
    setGames: state.setGames,
    updateGameConfiguration: state.updateGameConfiguration,
    startGame,
  });
};

App();
