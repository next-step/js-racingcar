import { Car, CarRace } from './classes/index';

const startGame = (inputCars) => {
  const cars = inputCars.map((car) => new Car(car));
  const carRace = new CarRace(cars);

  while (!carRace.isRaceDone()) {
    carRace.race();
    carRace.printRace();
    carRace.nextLap();
  }
  carRace.printWinners();
};

export default startGame;
