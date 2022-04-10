// components
import UserRacingInput from './components/UserRacingInput.js';
import GameProcess from './components/GameProcess.js';

// models
import GameProcessModel from './model/GameProcessModel.js';
import GameConfiguration from './model/GameConfiguration.js';

const App = async () => {
  const startGame = data => {
    GameProcess({
      gameProcessState: new GameProcessModel(data),
    });
  };

  UserRacingInput({
    userRacingInputState: new GameConfiguration(),
    startGame,
  });
};

App();
