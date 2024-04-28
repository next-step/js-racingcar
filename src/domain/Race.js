import View from "../view/view.js";
import Car from "./Car.js";

const MAX_RACE_ROUND = 5;
class Race {
  cars = [];
  currentRound = 0;

  constructor(cars = []) {
    this.cars = cars.map(car => new Car(car));
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
  };

  getTotalRounds(){
    return this.currentRound;
  }
}

export default Race;