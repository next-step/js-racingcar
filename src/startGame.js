import { Car, CarRaceOrganizer } from './classes/index';

const startGame = (inputCars) => {
  const cars = inputCars.map((car) => new Car(car));
  const carRaceOrganizer = new CarRaceOrganizer(cars);
  carRaceOrganizer.runFullRace();
};

export default startGame;
