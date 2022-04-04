import UserRacingInput from './components/UserRacingInput.js';
import GameProcess from './components/GameProcess.js';

const App = () => {
  const startGame = ({ carNames, playTimes }) => {
    GameProcess({ carNames, playTimes });
  };

  UserRacingInput({ startGame });
};

App();
