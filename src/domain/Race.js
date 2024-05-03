import { RANDOM_BOUND } from "../constants/index.js";
import View from "../view/view.js";

const MAX_RACE_ROUND = 5;

class Race {
  cars = [];
  currentRound = 0;

  constructor(cars = []) {
    this.cars = cars;
  };

  start(){
    View.printRaceStart();
    for(let i = 0; i < MAX_RACE_ROUND; i ++){
      this.moveCars();
      this.onNextRound();
    };
    View.printWinners(this.winners);
  };

  moveCars() {
    this.cars.forEach(car => {
      car.moveForward(this.getRandomValue());
      View.printRaceProgress(car.name, car.position);
    });
  }

  onNextRound(){
    this.currentRound++;
  }

  getRandomValue(){
    return Math.floor(Math.random() * RANDOM_BOUND);
  };

  get totalRounds(){
    return this.currentRound;
  }

  get winners(){
    const highestPosition = Math.max(...this.cars.map(car => car.position));
    return this.cars.filter(car => car.position === highestPosition);
  }
}

export default Race;