import View from "../view/view.js";
import Car from "./Car.js";

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
      this.cars.map(car => {
        car.moveForward(car.getRandomValue());
        View.printRaceProgress(car.name, car.position);
      });
      this.currentRound ++;
    };
    View.printWinners(this.winners);
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