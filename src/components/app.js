import UserInputForm from './userInputForm.js';
import GameProcess from './gameProcess.js';
import GameResult from './gameResult.js';
import { INITAL } from '../constants/common.js';

export default function App() {
  this.state = {
    cars: INITAL.CARS,
    raceTime: INITAL.RACE_TIMES,
  };

  this.$userInputForm = new UserInputForm({
    initState: this.state,
    setCars: (carNames) => {
      const newCars = carNames.map((carName, id) => ({ id, carName, goCount: 0 }));
      this.setState({ ...this.state, cars: newCars });
    },
  });
  this.$gameProcess = new GameProcess();
  this.$gameResult = new GameResult();

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  this.render = () => {
    this.$userInputForm.setState(this.state);
  };
}
