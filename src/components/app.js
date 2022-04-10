import UserInputForm from './userInputForm.js';
import GameProcess from './gameProcess.js';
import GameResult from './gameResult.js';
import { INITAL } from '../constants/common.js';

export default function App() {
  this.state = {
    cars: INITAL.CARS,
    raceTimes: INITAL.RACE_TIMES,
    raceFinishedFlag: INITAL.RACE_FINISHED_FLAG,
  };

  this.$userInputForm = new UserInputForm({
    initState: this.state,
    setCars: (carNames) => {
      const newCars = carNames.map((carName, id) => ({ id, carName, goCount: INITAL.CAR_GO_COUNT }));
      this.setState({ ...this.state, cars: newCars });
    },
    setRaceTimes: (raceTimes) => {
      this.setState({ ...this.state, raceTimes });
    },
  });

  this.$gameProcess = new GameProcess({
    initState: this.state,
    handleRaceResult: (newState) => {
      this.setState({ ...this.state, ...newState });
    },
  });

  this.$gameResult = new GameResult({
    initState: this.state,
    handleResetGame: () => {
      this.setState({
        ...this.state,
        cars: INITAL.CARS,
        raceTimes: INITAL.RACE_TIMES,
        raceFinishedFlag: INITAL.RACE_FINISHED_FLAG,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    this.$userInputForm.setState(this.state);
    this.$gameProcess.setState(this.state);
    this.$gameResult.setState(this.state);
  };
}
