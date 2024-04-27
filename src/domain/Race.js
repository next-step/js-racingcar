import Car from "./Car";

class Race {
  cars = [];

  constructor(cars = []) {
    this.cars = cars.map(car => new Car(car));
  };

}

export default Race;