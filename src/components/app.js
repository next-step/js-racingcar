import UserInputForm from './userInputForm.js';
import GameProcess from './gameProcess.js';
import GameResult from './gameResult.js';

export default function App() {
  this.$userInputForm = new UserInputForm();
  this.$gameProcess = new GameProcess();
  this.$gameResult = new GameResult();
}
