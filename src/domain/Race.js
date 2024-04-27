import Car from "./Car";

const MAX_RACE_ROUND = 5;
class Race {
  cars = [];
  currentRound = 0;

  constructor(cars = []) {
    this.cars = cars.map(car => new Car(car));
  };

  start(){
    for(let i = 0; i < MAX_RACE_ROUND; i ++){
      this.cars.map(car => {
        car.moveForward(car.getRandomValue());
      });
      this.currentRound ++;
    };
  };

  getTotalRounds(){
    return this.currentRound;
  }
}

export default Race;