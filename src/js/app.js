import UserRacingInput from './components/UserRacingInput.js';
import GameProcess from './components/GameProcess.js';
const App = () => {
  const state = {
    isGameRunning: false,
  };

  const startGame = ({ carNames, playTimes }) => {
    state.isGameRunning = true;
    state.isGameRunning && GameProcess({ carNames, playTimes });
  };

  UserRacingInput({ startGame });
};

App();
