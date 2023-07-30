import { Car, CarRace } from './classes/index';

const startGame = (inputCars) => {
  const cars = inputCars.map((car) => new Car(car));
  const race = new CarRace(cars);

  while (race.checkRaceStatus()) {
    race.race();
    race.print();
    race.nextLap();
  }
  race.result();
};

export default startGame;
