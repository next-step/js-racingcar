// components
import UserRacingInput from './components/UserRacingInput.js';
import GameProcess from './components/GameProcess.js';

// models
import GameProcessModel from './model/GameProcessModel.js';
import UserRacingInputModel from './model/UserRacingInputModel.js';

const App = () => {
  const startGame = data => {
    GameProcess({
      gameProcessState: new GameProcessModel(data),
    });
  };

  UserRacingInput({
    userRacingInputState: new UserRacingInputModel(),
    startGame,
  });
};

App();
